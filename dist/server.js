"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
let server;
const app = (0, express_1.default)();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://mongoose:mongoose@cluster0.ml8mugs.mongodb.net/tourManagementDB?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to DB");
        server = app.listen(5002, () => {
            console.log("Server is listening to port 5002");
        });
    }
    catch (err) {
        console.log(err);
    }
});
startServer();
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to tour management app",
    });
});
// unhandled rejection error
process.on("unhandledRejection", (err) => {
    console.log("Unhandled rejection detected... Server shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// Uncaught Rejection Error
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// unhandled rejection error
process.on("SIGTERM", () => {
    console.log("Sigterm signal recieved... Server shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
