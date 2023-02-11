import { Body, Controller, Get, Post, Redirect, Req, Res, Session, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiExtraModels } from '@nestjs/swagger'
import * as svgCaptcha from 'svg-captcha';

import { ResultData } from '../../common/utils/result'
import { AllowAnon } from '../../common/decorators/allow-anon.decorator'
import { ApiResult } from '../../common/decorators/api-result.decorator'

import { UserEntity } from './user.entity'
import { UserService } from './user.service'

import { LoginUser } from './dto/login-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { CreateTokenDto } from './dto/create-token.dto'
import { Observable, of } from 'rxjs';

@ApiTags('User Register')
@ApiExtraModels(ResultData, UserEntity, CreateTokenDto)
@Controller()
export class BaseController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  @ApiOperation({ summary: 'Verification Image With Code'})
  @AllowAnon()
  createCode(@Req() req, @Res() res , @Session() session){
      const Captcha = svgCaptcha.create({
        size:4,
        fontSize:50,
        width:100,
        height: 34,
        background: '#cc9966'
      })
      session.code = Captcha.text
      res.type('image/svg+xml')
      res.send(Captcha.data)
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResult(UserEntity)
  @AllowAnon()
  async create(@Body() user: CreateUserDto): Promise<ResultData> {
    return await this.userService.create(user)
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResult(CreateTokenDto)
  @AllowAnon()
  async login(@Body() dto: LoginUser): Promise<ResultData> {
    return await this.userService.login(dto.account, dto.password)
  }

  @Post('/update/token')
  @ApiOperation({ summary: 'Refresh Token'})
  @ApiResult(CreateTokenDto)
  @ApiBearerAuth()
  async updateToken (@Req() req): Promise<ResultData> {
    return await this.userService.updateToken(req.user.id)
  }

  
  @Get('/test_redirect')
  @ApiOperation({ summary: 'Test Only'})
  @Redirect('https://nestjs.com', 301)
  @AllowAnon()
  createTest(@Req() req, @Res() res , @Session() session){
      const Captcha = svgCaptcha.create({
        size:8,
        fontSize:50,
        width:100,
        height: 34,
        background: '#cc9966'
      })
      session.code = Captcha.text
      return { url: 'https://docs.nestjs.com/v5/' }; //返回的值将覆盖传递给 @Redirect()装饰器的所有参数。
  }

  @Get('/test_observable')
  @ApiOperation({ summary: 'Test Only'})
  @AllowAnon()
  findAll(): Observable<any[]> {
    return of(['1','2','3','4','5']);
  }
  
}
