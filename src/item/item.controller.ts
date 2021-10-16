import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { CreateItemDto } from './create-item.dto';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get(':storage_no/item/:item_no')
  async findByIdItem(
    @Param('storage_no') storage_no: number,
    @Param('item_no') item_no: number,
  ): Promise<Item> {
    return null;
  }
  @Get(':storage_no/items')
  async findAllItem(@Param('storage_no') storage_no: number): Promise<Item[]> {
    const items = await this.itemService.findAllItem(storage_no);
    return items;
  }
  @Post(':storage_no/item')
  async createItem(
    @Param('storage_no') storage_no: number,
    @Body() createItemDto: CreateItemDto,
  ): Promise<Item> {
    const item = await this.itemService.createItem(storage_no, createItemDto);
    return item;
  }
  @Patch(':storage_no/item/:item_no')
  async updateItem(
    @Param('storage_no') storage_no: number,
    @Param('item_no') item_no: number,
  ): Promise<Item> {
    return null;
  }
  @Delete('storage_no/item/:item_no')
  async deleteItem(
    @Param('storage_no') storage_no: number,
    @Param('item_no') item_no: number,
  ): Promise<void> {
    return null;
  }
}
