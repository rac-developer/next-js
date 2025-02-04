import {Roboto, Bebas_Neue} from 'next/font/google';

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap',
});

export const bebas_neue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
});