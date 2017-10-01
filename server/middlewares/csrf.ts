import * as csrf from 'csurf';

const csrfProtection = csrf({cookie: true});

export const CsrfMiddleware = csrfProtection;
