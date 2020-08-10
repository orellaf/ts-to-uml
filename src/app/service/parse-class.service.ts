import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseClassService {

  constructor() { }



  parse(file: File): Promise<UmlData> {

    return new Promise((successCallback, failureCallback) => {
      const reader = new FileReader();

      const extension = this._getExtension(file.name)
      if (extension !== "ts") {
        failureCallback('Invalid extension ' + extension)
        return
      }

      reader.onload = (evt) => {

        var lines = (reader?.result as string).split('\n');
        var uml: UmlData = null

        lines.forEach(line => {
          try {
            if (line.trim() !== '' &&  !this._indexOf(line, 'constructor').isPresent()) {

              // class
              var classIndexOf = this._indexOf(line, 'class')
              if (classIndexOf.isPresent()) {
                const classIndex = classIndexOf.get()
                const bracketIndex = this._indexOf(line, '{').getOrElse(line.length)

                uml = new UmlData()
                uml.className = this._findUmlData(line, classIndex + 'class'.length, bracketIndex).trim()
                uml.attributes = []
                uml.methods = []

                // attribute
              } else if (line.indexOf(':') !== -1 && line.indexOf('{') === -1 && line.indexOf('(') === -1) {

                this._checkClassFound(uml)

                var startIndex = this._computeIndex(line, ['public', 'private', 'protected'])


                var attr = new Attr()
                attr.name = this._findUmlData(line, startIndex, line.indexOf(':'))
                attr.type = this._findUmlData(line, line.indexOf(':') + 1, line.indexOf(';'))


                uml.attributes.push(attr)


              } else if (line.indexOf('{') !== -1 && line.indexOf('(') !== -1) {
                this._checkClassFound(uml)

                const startIndex = this._computeIndex(line, ['static', 'public', 'private', 'protected'])


                const isReturntype = line.indexOf('):') !== -1
                const isParams = line.indexOf(')') !== line.indexOf('(') + 1


                const method = new Method()
                method.name = this._findUmlData(line, startIndex, line.indexOf('('))
                method.type = isReturntype ? this._findUmlData(line, line.indexOf('):') + 2, line.indexOf('{'))
                  : ''
                method.params = isParams ? this._findUmlData(line, line.indexOf('(') + 1, line.indexOf(')')) : ''
                method.isStatic = line.indexOf('static') !== -1

                uml.methods.push(method)
              }
            }
          } catch (error) {
            failureCallback(error.message)
          }

        });
        if (uml !== null) {
          successCallback(uml)
        } else {
          failureCallback('Problem during the parsing')
        }

      };
      reader.readAsText(file);
    })
  }



  _getExtension(filename: string): string {
    if (this._indexOf(filename, '.').isPresent()) return filename.split('.').pop()
    return ''
  }

  _checkClassFound(data: UmlData) {
    if (data === null) throw new Error('Not found a class.')
  }

  _subString(line: string, startIndex: number, endIndex: number): string {
    var res = 'undefined'
    if (startIndex >= 0 && endIndex > 0 && startIndex < endIndex) res = line.substring(startIndex, endIndex)

    return res
  }

  _findUmlData(line: string, startIndex: number, endIndex: number): string {
    return this._subString(line, startIndex, endIndex).trim()
  }

  _indexOf(line: string, character: string) {
    return {
      get(): number {
        return line.indexOf(character)
      },
      isPresent(): boolean {
        return line.indexOf(character) !== -1
      },
      getOrElse(defaultt: number): number {
        return this.isPresent() ? this.get() : defaultt
      }
    }
  }

  _computeIndex(line: string, characters: string[]) {
    let index = 0
    characters.forEach(element => {

      const i = this._indexOf(line, element)
      if (i.isPresent() && index <= i.get()) {
        index = i.get() + element.length
      }
    })

    return index
  }

}

export class UmlData {
  className: string
  attributes: Attr[]
  methods: Method[]
}

export class Attr {
  name: string
  type: string
}

export class Method {
  name: string
  type: string
  isStatic: boolean
  params: string
}

