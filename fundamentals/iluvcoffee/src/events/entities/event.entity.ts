import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Event extends mongoose.Document {
  // Note "entity" was removed from the class "name"
  @Prop()
  type: string;

  @Prop({ index: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
// EventSchema.index({ name: 1, type: -1 }); // compound index on name and type 1 for ascending and -1 for descending order
