import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  Observable,
  of,
  filter,
  map,
  mergeMap,
  defaultIfEmpty,
  catchError,
  throwError,
} from 'rxjs';
import { GroupsDao } from './dao/groups.dao';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(private readonly _groupsDao: GroupsDao) {}

  findAll = (): Promise<GroupEntity[] | void> => this._groupsDao.find();

  findOne = (id: string): Observable<GroupEntity> =>
    this._groupsDao.findById(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((group) =>
        !!group
          ? of(new GroupEntity(group))
          : throwError(
              () => new NotFoundException(`Group with id ${id} not found`),
            ),
      ),
    );

  create = (group: CreateGroupDto): Observable<GroupEntity> =>
    this._prepareNewGroup(group).pipe(
      mergeMap((newPreparedGroup: CreateGroupDto) =>
        this._groupsDao.save(newPreparedGroup),
      ),
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `Group with id ${group.id} already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      map((groupCreated) => new GroupEntity(groupCreated)),
    );

  update = (id: string, group: UpdateGroupDto): Observable<GroupEntity> =>
    this._groupsDao.findByIdAndUpdate(id, group).pipe(
      catchError((e) =>
        e.code === 11000
          ? throwError(
              () =>
                new ConflictException(
                  `Group with id ${group.id} already exists`,
                ),
            )
          : throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((groupUpdated) =>
        !!groupUpdated
          ? of(new GroupEntity(groupUpdated))
          : throwError(
              () => new NotFoundException(`Group with id '${id}' not found`),
            ),
      ),
    );

  delete = (id: string): Observable<void> =>
    this._groupsDao.findByIdAndRemove(id).pipe(
      catchError((e) =>
        throwError(() => new UnprocessableEntityException(e.message)),
      ),
      mergeMap((groupDeleted) =>
        !!groupDeleted
          ? of(undefined)
          : throwError(
              () => new NotFoundException(`Group with id '${id}' not found`),
            ),
      ),
    );

  private _prepareNewGroup = (
    group: CreateGroupDto,
  ): Observable<CreateGroupDto> =>
    of({
      ...group,
      responsibles: [],
      secretaries: [],
      students: [],
    });
}
