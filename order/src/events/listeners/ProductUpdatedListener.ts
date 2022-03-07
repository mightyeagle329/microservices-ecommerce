import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  ProductUpdatedEvent,
  NotFoundError,
  QueueGroupNames,
} from "@thasup-dev/common";

import { Product } from "../../models/product";

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
  queueGroupName = QueueGroupNames.ORDER_SERVICE;

  async onMessage(data: ProductUpdatedEvent["data"], msg: Message) {
    const product = await Product.findByEvent(data);

    if (!product) {
      throw new NotFoundError();
    }

    const { id, title, price, image, colors, sizes, countInStock, orderId } =
      data;

    product.set({
      id,
      title,
      price,
      image,
      colors,
      sizes,
      countInStock,
      orderId,
    });
    await product.save();

    // Acknowledge the message and tell NATS server it successfully processed
    msg.ack();
  }
}
