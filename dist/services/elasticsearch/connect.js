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
Object.defineProperty(exports, "__esModule", { value: true });
const client = require('./client');
let tries = 3;
const sleep = (ms) => new Promise((res) => setTimeout(() => res(), ms));
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    while (tries) {
        try {
            yield client.ping();
            console.log('Connected to elasticsearch cluster');
            return client;
        }
        catch (err) {
            console.log(err.message);
            console.trace('Elasticsearch cluster is down!');
        }
        console.log(`could not connect to es ${tries} tries left`);
        tries -= 1;
        // wait 30 seconds
        yield sleep(30000);
    }
    throw new Error('elastic search cluster is down');
});
exports.default = connect;
