import { UserDto } from '../entities/user.dto';
import { User } from '../entities/user.entity';

export class UserService {
    public getUserByUsername(username: string): UserDto {
        const user = new User();
        user.firstName = 'Eugene';
        user.lastName = 'K';
        user.username = username;
        user.password = '123456';
        user.bio = {
            job: {
                title: 'Software Developer',
                salary: 1000
            },
            birthday: new Date('1990-01-01'),
            avatarUrl: 'https://avatar.com'
        };
        return UserDto.fromUser(user);
    }
}