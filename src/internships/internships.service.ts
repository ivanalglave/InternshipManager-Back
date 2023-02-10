import { Injectable } from '@nestjs/common';
import { InternshipDao } from './dao/internships.dao';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { InternshipEntity } from './entities/internship.entity';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path'; 
import { v4 } from 'uuid';
import { timeStamp } from 'console';
import { STATE_SECRETARY_ESTABLISHES_INTERNSHIP_AGREEMENT } from 'src/shared/InternshipState';
import config from 'src/config';




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
    var information = await this.findOne(id).then( (data: InternshipEntity) => 
        data.information);

    //on recupere les informations de l'entreprise
    var nomEntreprise = information.company.companyName;
  
    var adresse = information.company.address;
    var adresseString = adresse.street + ', ' + adresse.postalCode + ', ' + + adresse.city + ', ' + adresse.country;

    var telOrganisme = 'NULL';

    var melOrganisme = information.company.hrContactEmail;

    var reprsentePar = information.company.ceoName;

    var qualiteRepresentant = 'NULL';

    var nomService = information.affectation.service;

    var lieuStage = information.company.address;
    var lieuStageString = lieuStage.street + ', ' + lieuStage.postalCode + ', ' + lieuStage.city + ', ' + lieuStage.country;

    //on recupere les informations de l'etudiant
    var etudiant = information.student;

    var nomEtudiant = etudiant.completeName;

    var dateNaissanceEtudiant = etudiant.birthDate.toDateString();

    var adresseEtudiant = etudiant.address.street + ', ' + etudiant.address.postalCode + ', ' + etudiant.address.city + ', ' + etudiant.address.country;

    var telEtudiant = etudiant.phone;

    var melEtudiant = etudiant.email;

     //on recupere les informations du stage
     var sujetStage = 'NULL';

     var dateDebutStage = information.affectation.dateStart.toDateString();

    var dateFinStage = information.affectation.dateEnd.toDateString();

    const diffInMs = information.affectation.dateEnd.getTime() - information.affectation.dateStart.getTime();
    const diffInWeeks = diffInMs / 1000 / 60 / 60 / 24 / 7;
    var dureeStageEnSemaines = Math.ceil(diffInWeeks);

    var dureeStageEnJours = dureeStageEnSemaines * 5;

    //on recupere les informations du tuteur du stage
    var nomCompletTuteur = information.affectation.responsibleName;

    var fonctionTuteur = information.affectation.responsibleFunction;

    var telTuteur = information.affectation.responsiblePhone;

    var melTuteur = information.affectation.responsibleEmail;

    const filePath = join(__dirname, '..', '..', 'src', 'shared', 'conventions', 'convention_a_modifier.pdf');
    const existingPdfBytes = readFileSync(filePath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // on remplit les informations de l'entreprise
    firstPage.drawText(nomEntreprise, {
    x: 61,
    y: 564,
    size: 9,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
    });

    firstPage.drawText(adresseString, {
    x: 73,
    y: 542,
    size: 9,
    font: helveticaFont,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
    });

    firstPage.drawText(telOrganisme, {
      x: 52,
      y: 522,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
      });

    firstPage.drawText(melOrganisme, {
      x: 149,
      y: 522,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
      });
    
    firstPage.drawText(reprsentePar, {
      x: 98,
      y: 501,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
      });
    
    firstPage.drawText(qualiteRepresentant, {
      x: 130,
      y: 480,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(nomService, {
      x: 230,
      y: 459,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(lieuStageString, {
      x: 98,
      y: 438,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    // on remplit les informations de l'entreprise
    firstPage.drawText(nomEtudiant, {
      x: 98,
      y: 396,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(dateNaissanceEtudiant, {
      x: 137,
      y: 374,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(adresseEtudiant, {
      x: 73,
      y: 353,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(telEtudiant, {
      x: 52,
      y: 331,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(melEtudiant, {
      x: 149,
      y: 331,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(sujetStage, {
      x: 102,
      y: 231,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(dateDebutStage, {
      x: 119,
      y: 214,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(dateFinStage, {
      x: 221,
      y: 214,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(dureeStageEnSemaines.toString(), {
      x: 200,
      y: 197,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(dureeStageEnJours.toString(), {
      x: 276,
      y: 197,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(nomCompletTuteur, {
      x: 380,
      y: 131,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(fonctionTuteur, {
      x: 360,
      y: 110,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(telTuteur, {
      x: 345,
      y: 89,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });

    firstPage.drawText(melTuteur, {
      x: 345,
      y: 69,
      size: 9,
      font: helveticaFont,
      color: rgb(0, 0, 0),
      rotate: degrees(0),
    });





    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    const newFileName = v4();
    const newFilePath = join(__dirname, '..', '..', 'src', 'shared','conventions', newFileName + '.pdf');
    writeFileSync(newFilePath, pdfBytes);
    const resourceURI = `${config.server.uri}:${config.server.port}/resources/agreements/${newFileName}.pdf`;
    this._internshipsDao.findByStudentIdAndUpdateTracking(id,STATE_SECRETARY_ESTABLISHES_INTERNSHIP_AGREEMENT,resourceURI);
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
