import { Injectable } from '@angular/core';
import * as toxicity from '@tensorflow-models/toxicity'
@Injectable({
  providedIn: 'root'
})
export class ToxicityService {
  model: any;
  threshold = 0.9;
  toxicLable = ['insult', 'identity_attack', 'threat', 'toxicity'];
  constructor() {
    this.loadModel();
  }

  async loadModel() {
    this.model = await toxicity.load(this.threshold, this.toxicLable)
  }
  async detect(sentence: []) {

    return this.model.classify(sentence)

  }
}
