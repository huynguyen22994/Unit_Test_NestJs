import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from '../../services/payments/payments.service'
import { Request, Response } from 'express'
import { BadRequestException } from '@nestjs/common';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  const requestMock = {
    query: {}
  } as unknown as Request
  const statusResponseMock = {
    send: jest.fn((y) => y)
  }
  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((y) => y)
  } as unknown as Response

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENT_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x)
          }
        }
      ]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENT_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should payment service be defined', () => {
    expect(paymentsService).toBeDefined();
  })

  describe('getPayments', () => {
    it('should return a status of 400', async () => {
      await controller.getPayments(requestMock, responseMock)
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Error:::'
      })
    })

    it('should return a status of 200 when query a present', async () => {
      requestMock.query = {
        count: '10',
        page: '1'
      }
      await controller.getPayments(requestMock, responseMock)
      expect(responseMock.status).toHaveBeenCalledWith(200)
    })
  })

  describe('createPayment', () => {
    it('should throw a error', async () => {
      jest.spyOn(paymentsService, 'createPayment')
      .mockImplementation(() => {
        throw new BadRequestException
      })
      const response = await controller.createPayment({
        email: 'huy.nguyen22994@gmail.com',
        price: 1000
      })
      // expect(response).toStrictEqual({status: 'success'})
    })
  })

});
