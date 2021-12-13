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
exports.HospitalBed = void 0;
const typeorm_1 = require("typeorm");
const infirmary_entity_1 = require("./infirmary.entity");
let HospitalBed = class HospitalBed {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HospitalBed.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => infirmary_entity_1.Infirmary, infirmary => infirmary.hospitalBeds, {
        nullable: false,
    }),
    __metadata("design:type", infirmary_entity_1.Infirmary)
], HospitalBed.prototype, "infirmary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], HospitalBed.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Boolean)
], HospitalBed.prototype, "isFilled", void 0);
HospitalBed = __decorate([
    (0, typeorm_1.Entity)()
], HospitalBed);
exports.HospitalBed = HospitalBed;
