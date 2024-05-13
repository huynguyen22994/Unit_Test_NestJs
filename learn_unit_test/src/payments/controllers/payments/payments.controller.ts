import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { PaymentsService } from '../../services/payments/payments.service'
import { CreatePaymentDto } from '../../dto/CreatePayment.dto'

@Controller('payments')
export class PaymentsController {
    constructor(
        @Inject('PAYMENT_SERVICE') private readonly paymentsService: PaymentsService
    ){}

    @Get()
    async getPayments(@Req() request: Request, @Res() response: Response ) {
        const { count, page } = request.query;
        if(!count || !page) response.status(400).send({ msg: 'Error:::' })
        response.status(200)
    }

    @Post('create')
    async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
        try {
            const response = await this.paymentsService.createPayment(createPaymentDto)
            return response
        } catch(error) {
            return error
        }
    }
}
