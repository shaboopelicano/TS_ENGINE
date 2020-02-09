import { gl } from './gl';

/* 
    Representa a informa;'apo
*/
export class AttributeInfo {
    public location: number;
    public size: number;
    public offset: number;
}

export class GLBuffer {

    private _hasAttrivuteLocation: boolean = false;
    private _elementSize: number;
    private _stride: number;
    private _buffer: WebGLBuffer;

    private _targetBufferType: number;
    private _dataType: number;
    private _mode: number;
    private _typeSize: number;

    private _data: number[] = [];
    private _attributes: AttributeInfo[] = [];

    /* 
        Creates a new GLBuffer
        @param elementSize the size of each element
        @param dataType the size of each element
        @param targetBufferType the buffer target type
        @param mode 
    
    */
    public constructor(elementSize: number, dataType: number = gl.FLOAT, targetBufferType: number = gl.ARRAY_BUFFER, mode: number = gl.TRIANGLES) {
        this._elementSize = elementSize;
        this._dataType = dataType;
        this._targetBufferType = targetBufferType;
        this._mode = mode;

        // determinar o tipo de dado
        switch (this._dataType) {
            case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT:
                this._typeSize = 4; break;
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
                this._typeSize = 2; break;
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
                this._typeSize = 1; break;
            default:
                throw new Error("Unrecognized data type " + dataType.toString());

        }

        this._stride = this._elementSize * this._typeSize;
        this._buffer = gl.createBuffer();
    }

    public destroy(): void {
        gl.deleteBuffer(this._buffer);
    }

    public bind(normalized: boolean = false): void {
        gl.bindBuffer(this._targetBufferType, this._buffer);
        if (this._hasAttrivuteLocation) {
            for (const attr of this._attributes) {
                gl.vertexAttribPointer(attr.location, attr.size, this._dataType, normalized, this._stride, attr.offset * this._typeSize);
                gl.enableVertexAttribArray(attr.location);
            }
        }
    }

    public unbind(): void {
        gl.bindBuffer(this._targetBufferType, this._buffer);
        if (this._hasAttrivuteLocation) {
            for (const attr of this._attributes)
                gl.disableVertexAttribArray(attr.location);
        }
    }

    /* 
        Adiciona um atributo com a informação para o buffer
        @ param info
    */
    public addAttributeLocation(info: AttributeInfo): void {
        this._hasAttrivuteLocation = true;
        this._attributes.push(info);
    }

    /* 
        Adciona dados para o buffer
        @param data
    */
    public pushBackData(data: number[]): void {
        for(let d of data){
            this._data.push(d);
        }
    }

    /* 
        Upload esse buffer para o GPU
    */
    public upload(): void {
        gl.bindBuffer(this._targetBufferType, this._buffer);
        let bufferData: ArrayBuffer;
        switch (this._dataType) {
            case gl.FLOAT: bufferData = new Float32Array(this._data); break;
            case gl.INT: bufferData = new Int32Array(this._data); break;
            case gl.UNSIGNED_INT: bufferData = new Uint32Array(this._data); break;
            case gl.SHORT: new Int16Array(this._data); break;
            case gl.UNSIGNED_SHORT: new Uint16Array(this._data); break;
            case gl.BYTE: new Int8Array(this._data); break;
            case gl.UNSIGNED_BYTE: new Uint8Array(this._data); break;
        }

        gl.bufferData(this._targetBufferType, bufferData, gl.STATIC_DRAW);
    }

    /* 
        Draws this buffer
    */
    public draw(): void {
        if (this._targetBufferType === gl.ARRAY_BUFFER) {
            gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
        }
        else if (this._targetBufferType === gl.ELEMENT_ARRAY_BUFFER) {
            gl.drawElements(this._mode, this._data.length, this._dataType, 0);
        }
    }

}