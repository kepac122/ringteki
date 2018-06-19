const DrawCard = require('../../drawcard.js');

class ClarityOfPurpose extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Character cannot be bowed and doesn\'t bow during political conflicts',
            condition: () => this.game.isDuringConflict(),
            target: {
                cardType: 'character',
                controller: 'self',
                gameAction: [
                    ability.actions.cardLastingEffect({
                        condition: () => this.game.isDuringConflict('political'),
                        effect: ability.effects.doesNotBow()
                    }),
                    ability.actions.cardLastingEffect({
                        effect: ability.effects.cardCannot('bow', context => (
                            context.source.type !== 'ring' && context.player && context.player.opponent &&
                            context.source.controller === context.player.opponent
                        ))
                    })
                ]
            },
            effect: 'prevent opponents\' actions from bowing {0} and stop it bowing at the end of a political conflict'
        });
    }
}

ClarityOfPurpose.id = 'clarity-of-purpose';

module.exports = ClarityOfPurpose;
