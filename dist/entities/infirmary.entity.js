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
exports.Infirmary = void 0;
const typeorm_1 = require("typeorm");
const hospital_entity_1 = require("./hospital.entity");
const hospitalBed_entity_1 = require("./hospitalBed.entity");
let Infirmary = class Infirmary {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Infirmary.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => hospital_entity_1.Hospital, hospital => hospital.infirmaries, {
        nullable: false,
    }),
    __metadata("design:type", hospital_entity_1.Hospital)
], Infirmary.prototype, "hospital", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Infirmary.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(() => hospitalBed_entity_1.HospitalBed, hospitalBed => hospitalBed.infirmary),
    __metadata("design:type", Array)
], Infirmary.prototype, "hospitalBeds", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Infirmary.prototype, "isActive", void 0);
Infirmary = __decorate([
    typeorm_1.Entity()
], Infirmary);
exports.Infirmary = Infirmary;
