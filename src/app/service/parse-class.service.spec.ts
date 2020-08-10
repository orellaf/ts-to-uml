import { TestBed } from '@angular/core/testing';
import { ParseClassService } from './parse-class.service';


describe('ParseClassService', () => {
  let service: ParseClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('_getExtension: should be a ts extension', () => {
    const extension = service._getExtension('person.ts')
    expect(extension).toEqual('ts')

  });

  it('_getExtension: should be a txt extension', () => {
    const extension = service._getExtension('person.txt')
    expect(extension).toEqual('txt')

  });

  it('_getExtension: should be an empty extension', () => {
    const extension = service._getExtension('person')
    expect(extension).toEqual('')

  });

  it('_checkClassFound: should throw an error', () => {

    expect(function () { service._checkClassFound(null) }).toThrow(new Error('Not found a class.'))

  });

  it('_computeIndex: should be equals to 6', () => {

    const line = 'public getName(): string {'
    let index = service._computeIndex(line, ['public'])

    expect(index).toEqual(6)

  });


  it('_computeIndex: should be equals to 13', () => {

    const line = 'public static getName(): string {'
    let index = service._computeIndex(line, ['static', 'public'])

    expect(index).toEqual(13)

    index = service._computeIndex(line, ['public', 'static'])

    expect(index).toEqual(13)

  });


  it('_subString: should find a method name', () => {

    const line = 'public static getName(): string {'
    let methodName = service._subString(line, 'public static '.length, 'public static getName'.length)

    expect(methodName).toEqual('getName')

  });


  it('_subString: should be undefined', () => {

    const line = 'public static getName(): string {'
    let methodName = service._subString(line, 10, 5)

    expect(methodName).toEqual('undefined')

  });


  it('_indexOf: should be undefined', () => {

    const line = 'public static getName(): string {'
    let methodName = service._indexOf(line, '(')

    expect(methodName.isPresent()).toEqual(true)
    expect(methodName.get()).toEqual('public static getName('.length - 1)

  });

  it('_findUmlData: should be equals to getName', () => {

    const line = 'public static getName(): string {'
    let methodName = service._findUmlData(line, 'public static'.length, 'public static getName('.length - 1)

    expect(methodName).toEqual('getName')


  });


 


});
