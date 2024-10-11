function Hold() {
  this.piece=void 0;
}
Hold.prototype.draw = function() {
  clear(holdCtx);
  var p = this.piece;
  if (p === void 0){
    return;
  }
  var minh = (RotSys[settings.RotSys].initinfo[PieceI.index][2] & 1) ? 4 : 3;
  var initInfo = RotSys[settings.RotSys].initinfo[p];
  var r = initInfo[2];
  var rect = pieces[p].rect[r];
  draw(
    pieces[p].tetro[initInfo[2]],
    -rect[0] + (4 - rect[2] + rect[0]) / 2,
    -rect[1] + (minh - rect[3] + rect[1]) / 2,
    holdCtx,
    RotSys[settings.RotSys].color[p]
  );
}
var hold = new Hold();
