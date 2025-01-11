export class AuthError extends Error {
    code: number
    constructor(message: string, code: number = 401) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.code = code
    }
}

export class PermissionError extends Error {
    code: number
    constructor(message: string, code: number = 403) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.code = code
    }
}

export class ExeptionError extends Error {
    code: number
    constructor(message: string, code: number = 500) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.code = code
    }
}

export class NotFoundError extends Error {
    code: number
    constructor(message: string, code: number = 404) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.code = code
    }
}