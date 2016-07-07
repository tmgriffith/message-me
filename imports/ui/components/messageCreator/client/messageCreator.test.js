import { name as MessageCreator } from '../messageCreator';
import { Meteor } from 'meteor/meteor';
import 'angular-mocks';
 
describe('MessageCreator', () => {
  beforeEach(() => {
    window.module(MessageCreator);
  });
 
  describe('controller', () => {
    let $rootScope;
    let $componentController;
    const message = {
      _id: 'messageId'
    };
 
    beforeEach(() => {
      inject((_$rootScope_, _$componentController_) => {
        $rootScope = _$rootScope_;
        $componentController = _$componentController_;
      });
    });
 
    function component(bindings) {
      return $componentController(MessageCreator, {
        $scope: $rootScope.$new(true)
      }, bindings);
    }
 
    it('should return an empty string if there is no message', () => {
      const controller = component({
        message: undefined
      });
 
      expect(controller.creator).toEqual('');
    });
 
    it('should say `me` if logged in is the owner', () => {
      const owner = 'userId';
      // logged in
      spyOn(Meteor, 'userId').and.returnValue(owner);
      const controller = component({
        message: {
          owner
        }
      });
 
      expect(controller.creator).toEqual('me');
    });
 
    it('should say `nobody` if user does not exist', () => {
      const owner = 'userId';
      // not logged in
      spyOn(Meteor, 'userId').and.returnValue(null);
      // no user found
      spyOn(Meteor.users, 'findOne').and.returnValue(undefined);
      const controller = component({
        message: {
          owner
        }
      });
 
      expect(controller.creator).toEqual('nobody');
    });
 
    it('should return user data if user exists and it is not logged one', () => {
      const owner = 'userId';
      // not logged in
      spyOn(Meteor, 'userId').and.returnValue(null);
      // user found
      spyOn(Meteor.users, 'findOne').and.returnValue('found');
      const controller = component({
        message: {
          owner
        }
      });
 
      expect(controller.creator).toEqual('found');
    });
  });
});