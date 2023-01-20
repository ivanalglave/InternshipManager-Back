import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomInt } from 'crypto';
import { Model } from 'mongoose';
import { CreatePeopleDto } from '../dto/create-people.dto';
import { UpdatePeopleDto } from '../dto/update-people.dto';
import { People } from '../schemas/people.schema';
import * as Mailgun from 'mailgun-js';
import config from 'src/config';

@Injectable()
export class PeopleDao {
  private mg = Mailgun({
    apiKey: config.mailgun.apiKey,
    domain: config.mailgun.domain,
  });

  constructor(
    @InjectModel(People.name)
    private readonly _peopleModel: Model<People>,
  ) {}

  login = (email: string, password: string): Promise<People | void> =>
    new Promise((resolve, reject) => {
      this._peopleModel.findOne(
        { email: email, passwordHash: password },
        (err, value) => {
          if (err) reject(err.message);
          if (!value)
            reject(new NotFoundException('Email or password is incorrect!'));
          resolve(value);
        },
      );
    });

  find = (): Promise<People[]> =>
    new Promise((resolve, reject) => {
      this._peopleModel.find({}, {}, {}, (err, value) => {
        if (err) reject(err.message);
        if (!value) reject('No values');
        resolve(value);
      });
    });

  findById = (id: string): Promise<People | void> =>
    new Promise((resolve, reject) => {
      this._peopleModel.findById(id, (err, value) => {
        if (err) reject(err.message);
        if (!value) reject(new NotFoundException());
        resolve(value);
      });
    });

  save = (people: CreatePeopleDto): Promise<People> => {
    people.passwordHash = this.secret();
    return new Promise((resolve, reject) => {
      new this._peopleModel(people).save((err, value) => {
        if (err) reject(err.message);
        if (!value) reject(new InternalServerErrorException());
        this.sendPassword(people.email, people.passwordHash);
        resolve(value);
      });
    });
  };

  findByIdAndUpdate = (
    id: string,
    people: UpdatePeopleDto,
  ): Promise<People | void> =>
    new Promise((resolve, reject) => {
      this._peopleModel.updateOne(
        { id: id },
        people,
        {
          new: true,
          runValidators: true,
        },
        (err, value) => {
          if (err) reject(err.message);
          if (value.matchedCount === 0) reject(new NotFoundException());
          resolve(value);
        },
      );
    });

  findByIdAndRemove = (id: string): Promise<People | void> =>
    new Promise((resolve, reject) => {
      this._peopleModel.deleteOne({ id: id }, {}, (err) => {
        if (err) reject(err.message);
        resolve();
      });
    });

  secret = (length = 10) => {
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const minus = '-';
    const underLine = '_';
    const special = '!"#$%&\'*+,./:;=?@\\^`|~';
    const brackets = '[]{}()<>';
    const alphabet =
      upperCase + lowerCase + digits + minus + underLine + special + brackets;
    let secret = '';
    for (let index = 0; index < length; index++)
      secret += alphabet.charAt(randomInt(alphabet.length));
    return secret;
  };

  async sendPassword(email: string, password: string) {
    const data = {
      from: 'Internship Manager <internshipmanager@master.il.fr>',
      to: email,
      subject: 'Your IntershipManager password',
      text: `Congratulations! Your account is activated. Your InternshipManager password is "${password}"`,
    };

    await this.mg.messages().send(data, function (error, body) {
      if (error) {
        console.log(error);
      } else {
        console.log(body);
      }
    });
  }
}
