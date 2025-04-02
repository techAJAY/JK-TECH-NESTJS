import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DocumentService } from './document.service';
import * as path from 'path';
import { Express } from 'express';

@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExtName = path.extname(file.originalname);
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
  ) {
    const filePath = `/uploads/${file.filename}`;
    const savedDocument = await this.documentService.create(title, filePath);
    return { message: 'File uploaded successfully', document: savedDocument };
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.documentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.documentService.remove(id);
  }
}
