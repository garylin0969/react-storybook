import { Meta, StoryObj } from '@storybook/react';
import InputController from './InputController';

const meta = {
    title: 'InputController',
    component: InputController,
    tags: ['autodocs'],
} satisfies Meta<typeof InputController>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
    args: {
        label: 'input',
        name: 'input',
    },
};
