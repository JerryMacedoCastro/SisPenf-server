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
exports.Patient = void 0;
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("./answer.entity");
const hospitalBed_entity_1 = require("./hospitalBed.entity");
let Patient = class Patient {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Patient.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToOne(() => hospitalBed_entity_1.HospitalBed),
    typeorm_1.JoinColumn(),
    __metadata("design:type", hospitalBed_entity_1.HospitalBed)
], Patient.prototype, "hospitalBed", void 0);
__decorate([
    typeorm_1.OneToMany(() => answer_entity_1.Answer, answer => answer.patient),
    __metadata("design:type", Array)
], Patient.prototype, "answers", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", Date)
], Patient.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: 'now()' }),
    __metadata("design:type", Date)
], Patient.prototype, "admissionDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: true }),
    __metadata("design:type", Boolean)
], Patient.prototype, "isActive", void 0);
Patient = __decorate([
    typeorm_1.Entity()
], Patient);
exports.Patient = Patient;
