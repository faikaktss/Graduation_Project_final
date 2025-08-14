import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { ConfigService } from "@nestjs/config";
import { PrismaService } from '../../prisma/prisma.service';  
interface JwtPayload{
    sub: number;
    email: string;
}
//Kullanıcın gerçekten var olup olmadığını kontrol eder
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private config: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//token'ı nasıl alacağımızı söyler
            ignoreExpiration: false,//süre bittiyse salla kabul etme
            secretOrKey: config.get<string>('JWT_ACCESS_SECRET'), // imza doğrulama kısmı
        });
    }

    async validate(payload: JwtPayload){
        const user = await this.prisma.user.findUnique({
            where:{id:payload.sub},
        });
        if(!user) return null;
        return {id:user.id , email :user.email};
    }
}