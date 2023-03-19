"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnosis = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
let Diagnosis = class Diagnosis {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Diagnosis.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Diagnosis.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => question_entity_1.Question, question => question.diagnoses),
    __metadata("design:type", Array)
], Diagnosis.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Diagnosis.prototype, "createdAt", void 0);
Diagnosis = __decorate([
    (0, typeorm_1.Entity)()
], Diagnosis);
exports.Diagnosis = Diagnosis;
