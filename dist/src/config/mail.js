"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            email: 'teste@teste.com.br',
            name: 'Equipe GoBarber',
        },
    },
};
