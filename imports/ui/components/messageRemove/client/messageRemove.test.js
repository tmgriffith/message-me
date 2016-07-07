import { name as MessageRemove } from '../messageRemove';
import { Messages } from '../../../../api/messages/index';
import 'angular-mocks';
 
describe('MessageRemove', () => {
  beforeEach(() => {
    window.module(MessageRemove);
  });
 
  describe('controller', () => {
    let controller;
    const message = {
      _id: 'messageId'
    };
 
    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(MessageRemove, {
          $scope: $rootScope.$new(true)
        }, {
          message
        });
      });
    });
 
    describe('remove()', () => {
      beforeEach(() => {
        spyOn(Messages, 'remove');
        controller.remove();
      });
 
      it('should remove a message', () => {
        expect(Messages.remove).toHaveBeenCalledWith(message._id);
      });
    });
  });
});