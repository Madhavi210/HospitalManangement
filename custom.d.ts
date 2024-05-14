declare global {
    namespace Express {
        interface Request {
            user?: User; // Define the user property
        }
    }
}
