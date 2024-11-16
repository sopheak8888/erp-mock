// src/services/faker.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Supplier } from 'src/entities/supplier.entity';
import { Item } from 'src/entities/item.entity';
import { Customer } from 'src/entities/customer.entity';
import { Order } from 'src/entities/order.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { InventoryTransaction } from 'src/entities/inventory-transaction.entity';
import { Reorder } from 'src/entities/reorder.entity';
import { OrderStatus } from 'src/entities/order.entity';
import { ReorderStatus } from 'src/entities/reorder.entity';
import { TransactionType } from 'src/entities/inventory-transaction.entity';

@Injectable()
export class FakerService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(InventoryTransaction)
    private inventoryTransactionRepository: Repository<InventoryTransaction>,
    @InjectRepository(Reorder)
    private reorderRepository: Repository<Reorder>,
  ) {}

  async seed(count: number = 10) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create suppliers
      const suppliers = await this.supplierRepository.save(
        Array(count)
          .fill(null)
          .map(() => ({
            name: faker.company.name(),
            contact_name: faker.person.fullName(),
            contact_phone: faker.phone.number(),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            created_at: faker.date.past(),
          })),
      );

      // Create items
      const items = await this.itemRepository.save(
        Array(count)
          .fill(null)
          .map(() => ({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            category: faker.commerce.department(),
            price: parseFloat(faker.commerce.price()),
            quantity_in_stock: faker.number.int({ min: 0, max: 1000 }),
            reorder_level: faker.number.int({ min: 10, max: 100 }),
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          })),
      );

      // Create customers
      const customers = await this.customerRepository.save(
        Array(count)
          .fill(null)
          .map(() => ({
            name: faker.person.fullName(),
            contact_phone: faker.phone.number(),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
            created_at: faker.date.past(),
          })),
      );

      // Create orders and order items
      for (const customer of customers) {
        const order = await this.orderRepository.save({
          customer,
          order_date: faker.date.recent(),
          status: faker.helpers.arrayElement(Object.values(OrderStatus)),
          remarks: faker.word.words(5),
        });

        const orderItems = await this.orderItemRepository.save(
          Array(faker.number.int({ min: 1, max: 5 }))
            .fill(null)
            .map(() => {
              const item = faker.helpers.arrayElement(items);
              const quantity = faker.number.int({ min: 1, max: 10 });
              const price = parseFloat(item.price.toString());
              return {
                order,
                item,
                quantity,
                price,
                total_price: quantity * price,
              };
            }),
        );

        // Update order total amount
        order.total_amount = orderItems.reduce(
          (sum, item) => sum + item.total_price,
          0,
        );
        await this.orderRepository.save(order);
      }

      // Create inventory transactions
      await this.inventoryTransactionRepository.save(
        items.flatMap((item) =>
          Array(faker.number.int({ min: 1, max: 3 }))
            .fill(null)
            .map(() => ({
              item,
              transaction_type: faker.helpers.arrayElement(
                Object.values(TransactionType),
              ),
              quantity: faker.number.int({ min: 1, max: 100 }),
              transaction_date: faker.date.recent(),
              source: faker.company.name(),
              remarks: faker.word.words(5),
            })),
        ),
      );

      // Create reorders
      await this.reorderRepository.save(
        items.flatMap((item) =>
          Array(faker.number.int({ min: 0, max: 2 }))
            .fill(null)
            .map(() => ({
              supplier: faker.helpers.arrayElement(suppliers),
              item,
              quantity: faker.number.int({ min: 10, max: 200 }),
              reorder_date: faker.date.recent(),
              status: faker.helpers.arrayElement(Object.values(ReorderStatus)),
              remarks: faker.word.words(5),
            })),
        ),
      );

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
