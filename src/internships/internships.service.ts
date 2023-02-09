import { Injectable } from '@nestjs/common';
import { InternshipDao } from './dao/internships.dao';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { InternshipEntity } from './entities/internship.entity';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';



@Injectable()
export class InternshipService {
  constructor(private readonly _internshipsDao: InternshipDao) {}

  findAll = (): Promise<InternshipEntity[] | void> =>
    this._internshipsDao.find();

  findOne = (studentId: string): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentId(studentId);

  create = (internship: CreateInternshipDto): Promise<InternshipEntity> =>
    this._internshipsDao.save(internship);

  async generatePDF (id: string): Promise<InternshipEntity>{

    console.log("generation pdf");

    const filePath = join(__dirname, '..', '..', 'files', 'convention_a_modifier.pdf');
    const existingPdfBytes = readFileSync(filePath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

   // Get the first page of the document
  const pages = pdfDoc.getPages();
  console.log("nombres de pages : ", pages.length )
  const firstPage = pages[0];

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize();

  // Draw a string of text diagonally across the first page
  firstPage.drawText('This text was added with JavaScript!', {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  });


  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  const newFileName = 'convention-' + id;
  const newFilePath = join(__dirname, '..', '..', 'files', newFileName + '.pdf');
  writeFileSync(newFilePath, pdfBytes);

  //on recupere les informations de l'entreprise
  var nomEntreprise = 'capgemini';
  var adresse = '99 rue CEDEX, Courbevoie';
      
    return null;
  }


  update = (
    studentId: string,
    internship: CreateInternshipDto,
  ): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentIdAndUpdate(studentId, internship);

  updateTracking = (
    studentId: string,
    state: string,
    content: string | boolean,
  ): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentIdAndUpdateTracking(
      studentId,
      state,
      content,
    );

  delete = (studentId: string): Promise<InternshipEntity | void> =>
    this._internshipsDao.findByStudentIdAndRemove(studentId);
}
