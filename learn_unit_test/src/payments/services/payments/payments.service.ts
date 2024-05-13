import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../../dto/CreatePayment.dto'

@Injectable()
export class PaymentsService {

    private users = [
        {
            email: 'huy.nguyen22994@gmail.com'
        },
        {
            email: 'abc@gmail.com'
        }
    ]

    async createPayment(createPaymentDto: CreatePaymentDto) {
        const { email } = createPaymentDto
        const user = this.users.find((user) => user.email === email)
        if(user) return { id: 1,  status: 'success' }

        throw new BadRequestException()
    }
}
