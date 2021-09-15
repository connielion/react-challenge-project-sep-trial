import React from 'react';
import { render, screen } from '@testing-library/react';

import OrdersList from './ordersList';

describe('Orders List', () => {
    test('renders with no prop', () => {
        render(
            <OrdersList
            />
        )
        const emptyDiv = document.getElementsByClassName('empty-orders');
        const arr = Array.from(emptyDiv);
        expect(arr.length).toBe(1);
    });

    test('renders one order', () => {
        const orders = [
            {
                order_item: "Food",
                quantity: "777",
                _id: 1
            }
        ];
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
    });

    test('renders multiple orders', () => {
        const orders = [
            {
                order_item: "Food",
                quantity: "777",
                _id: 1
            },
            {
                order_item: "Drink",
                quantity: "888",
                _id: 2
            }
        ];
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
        expect(screen.getByText('Drink')).toBeInTheDocument();
        expect(screen.getByText(/^.*888.*$/gm)).toBeInTheDocument();

    });


    test('renders zero-padded time when order is placed', () => {

        const orders = [
            {
                createdAt: '2021-09-15T17:00:04.987Z',
                order_item: "Food",
                quantity: "777",
                _id: 1
            },
        ];
        
        const zeroPad = num =>  num < 10 ? '0'+num : num;

        const createdDate = new Date(orders[0].createdAt);
        const minutes = createdDate.getMinutes(),
              seconds = createdDate.getSeconds();
        render(
            <OrdersList
                orders={orders}
            />
        )
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText(/^.*777.*$/gm)).toBeInTheDocument();
        expect(screen.getByText('Order placed at')).toBeInTheDocument();
        expect(minutes.toString.length).toEqual(1);
        expect(seconds.toString.length).toEqual(1);
        expect(zeroPad(minutes).toString().length).toEqual(2);
        expect(zeroPad(seconds).toString().length).toEqual(2);
    });
})