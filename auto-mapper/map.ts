import { createMap } from '@automapper/core';
import { mapper } from './mapper';
import { Bio, User } from '../entities/user.entity';
import { BioDto, UserDto } from '../entities/user.dto';
import { create } from 'domain';

export const createMappings = () => {
    createMap(mapper, Bio, BioDto);
    createMap(mapper, User, UserDto);
}