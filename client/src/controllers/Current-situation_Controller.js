import CurrentSituationModel from '../model/Current-situation_Model'

class CurrentSituation {

    async read(stockInput) {
        return await CurrentSituationModel.read(stockInput)
    }
}

export default new CurrentSituation();
