/**
* This file is auto-generated by nestjs-proto-gen-ts
*/

import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export namespace auth {
    export namespace v1alpha {
        export interface LoginRequest {
            email?: string;
            password?: string;
            ip?: string;
        }
        export interface LoginResponse {
            refreshToken?: string;
            jwt?: string;
            status?: LoginResponse.STATUS;
            test?: string;
        }
        export namespace LoginResponse {
            export enum STATUS {
                OK = 0,
                WRONG_PASSWORD = 1,
                NOT_FOUND = 2,
                INTERNAL = 3,
            }
        }
        export interface RefreshTokenRequest {
            refreshToken?: string;
            ip?: string;
        }
        export interface RefreshTokenResponse {
            refreshToken?: string;
            jwt?: string;
        }
        export interface ValidateRequest {
            jwt?: string;
        }
        export interface ValidateResponse {
            ok?: boolean;
            userId?: string;
            userEmail?: string;
            userRole?: user.v1alpha.UserRole;
            internal?: boolean;
        }
    }
}
export namespace user {
    export namespace v1alpha {
        export enum UserRole {
            USER_ROLE_BASIC = 0,
            USER_ROLE_ADMIN = 1,
        }
        export interface User {
            id?: string;
            firstName?: string;
            lastName?: string;
            email?: string;
            createdAt?: google.protobuf.Timestamp;
            updatedAt?: google.protobuf.Timestamp;
            role?: v1alpha.UserRole;
        }
        export interface RegisterRequest {
            password?: string;
            firstName?: string;
            lastName?: string;
            email?: string;
        }
        export interface RegisterResponse {
            user?: v1alpha.User;
        }
        export interface UpdateRequest {
            user?: v1alpha.User;
        }
        export interface UpdateResponse {
            user?: v1alpha.User;
        }
        export interface DeleteRequest {
            id?: string;
        }
        export interface DeleteResponse {
            user?: v1alpha.User;
        }
        export interface UpdatePasswordRequest {
            id?: string;
            password?: string;
        }
        export interface UpdatePasswordResponse {
            user?: v1alpha.User;
        }
        export interface FindRequest {
            id?: string;
            firstName?: string;
            lastName?: string;
            email?: string;
        }
        export interface FindResponse {
            user?: v1alpha.User[];
        }
        export interface CheckPasswordRequest {
            email?: string;
            password?: string;
        }
        export interface CheckPasswordResponse {
            status?: CheckPasswordResponse.STATUS;
            user?: v1alpha.User;
        }
        export namespace CheckPasswordResponse {
            export enum STATUS {
                OK = 0,
                WRONG_PASSWORD = 1,
                NOT_FOUND = 2,
                INTERNAL = 3,
            }
        }
        export interface MakeAdminRequest {
            id?: string;
            email?: string;
        }
        export interface MakeAdminResponse {
            user?: v1alpha.User;
        }
    }
}
export namespace google {
    export namespace protobuf {
        export interface Timestamp {
            seconds?: number;
            nanos?: number;
        }
    }
}

