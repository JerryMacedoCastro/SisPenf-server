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
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const diagnosis_entity_1 = require("./diagnosis.entity");
const option_entity_1 = require("./option.entity");
const patient_entity_1 = require("./patient.entity");
const question_entity_1 = require("./question.entity");
const user_entity_1 = require("./user.entity");
let Answer = class Answer {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.answers, {
        nullable: false,
    }),
    __metadata("design:type", user_entity_1.User)
], Answer.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => patient_entity_1.Patient, patient => patient.answers, {
        nullable: false,
    }),
    __metadata("design:type", patient_entity_1.Patient)
], Answer.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question, question => question.answers, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", question_entity_1.Question)
], Answer.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => option_entity_1.Option),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Answer.prototype, "selectedOptions", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => diagnosis_entity_1.Diagnosis),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Answer.prototype, "selectedDiagnoses", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Answer.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Answer.prototype, "createdAt", void 0);
Answer = __decorate([
    (0, typeorm_1.Entity)()
], Answer);
exports.Answer = Answer;
