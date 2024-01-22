export interface JwtResponseDto {
    /**
     * When the token is to expire in seconds
     */
    expiration: number;
    /**
     * A human-readable format of expires
     */
    expirationFormatted: string;
    /**
     * The Bearer token
     */
    token: string;
}