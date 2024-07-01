export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class HerbalTea extends Drug {
  updateBenefit() {
    if (this.expiresIn > 0) {
      this.benefit += 1;
    } else {
      this.benefit += 2;
    }
  }
}

export class Fervex extends Drug {
  updateBenefit() {
    if (this.expiresIn < 0) {
      this.benefit = 0;
    } else if (this.expiresIn <= 5) {
      this.benefit += 3;
    } else if (this.expiresIn <= 10) {
      this.benefit += 2;
    } else {
      this.benefit += 1;
    }
  }
}

export class MagicPill extends Drug {
  updateBenefit() {
    // No changes to benefit or expiresIn
  }
}

export class Dafalgan extends Drug {
  updateBenefit() {
    if (this.expiresIn > 0) {
      this.benefit -= 2;
    } else {
      this.benefit -= 4;
    }
  }
}

export class DefaultDrug extends Drug {
  updateBenefit() {
    if (this.expiresIn > 0) {
      this.benefit -= 1;
    } else {
      this.benefit -= 2;
    }
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs.map((drug) => {
      switch (drug.name) {
        case "Herbal Tea":
          return new HerbalTea(drug.name, drug.expiresIn, drug.benefit);
        case "Fervex":
          return new Fervex(drug.name, drug.expiresIn, drug.benefit);
        case "Magic Pill":
          return new MagicPill(drug.name, drug.expiresIn, drug.benefit);
        case "Dafalgan":
          return new Dafalgan(drug.name, drug.expiresIn, drug.benefit);
        default:
          return new DefaultDrug(drug.name, drug.expiresIn, drug.benefit);
      }
    });
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      drug.updateBenefit();
      drug.expiresIn -= drug instanceof MagicPill ? 0 : 1;
      drug.benefit = Math.max(0, Math.min(drug.benefit, 50));
    });

    return this.drugs;
  }
}
