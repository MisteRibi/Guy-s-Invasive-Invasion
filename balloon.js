function Balloon (x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.xDir = BALLOON_SPEED;
    this.health = BALLOON_HEALTH;
    this.img = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IB2cksfwAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEADcAIAD//w12hAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+kEBAEJJoVwhf4AAASdSURBVFjD1ZlPbBRVHMc/781A6dKFirS12DbdIKhNKTV66kmtRDgYIhSSckFjAqYePJCQmIiGyImkJh6sUS9GgzUcUEOMMbRaEU2pJIKtTSjg0kYtaQttgV1LuzM/D/sWdrfbdmdKt/WXTLLJvjfzne/vz/v+fqPwabe6r1iW0luAOqAW2ACUAsHEEmAQuAScB35xxD0V3LTe8fM85XVDtCf8NNAIvAgUedw+DHwJtAaqQx0LAjTaE64HmoAd3B87AbQEqkPt9wXore4rxZbSB4EDLIw1O+IeDW5aP+QbqHHzm0A9C2vtwJHZwkHNAnI38DZQRW6sFzgcqA4dzxqoAfkOsJHcWh9wKBNYNYO7388hk5mYfS09DFSGxPk8BzE5Z8w64u5JTjCd/K/J7sUGCVBvsExn1NTJNq93dJPe1hVBK3U/AT+XqLPJjDbNBSiTJd8gG5CuN6BNKYyaBPohW+Y8s57EtI/7PBOoDnUk9jTOtVqnsyLmSjcBZa74mtRw8PGyjQDKqKBBHwIjtc65AnccnNtRrl8bQkQoXPsgK4IrkcAyxPLrD4YdcUttI9V8g1QCk+O36Wo7zbnOTv7uHyAWi8X/U4oH1qxh16uv8PiTNbj+8qzIUnqLbfRkdiYJ18fdqQSWOULrx59w/sxZtNZseqKG6tpaLMti4Go/v3V1MTZyHeUClm+H1dlG9HoShdr80DHhq8++4I8fO1lbXkrDvpcJ1TyG0hoBNiPU720gEong6nmVqVrbKHNfNhju56fvTpEfyGfv602UbKzE1epujikU+QUryS9YicyvcmywTfvgy8J9l2FiiorNj1JU/jCuViCC5Sr0PbQ4inh8+j8LSu2kHsebiTA+PAKOUFhSjJ23nJhh8fuT3zA6NAKugFaQn8eOxt1g62mJKNmBD9p+X1FEUrI7+eEXz13gr74/USJMTUxCYYCGXQ2IpVOAiQeGbdMtrvZclpQisKoAFETHxnGnYmDbiILtL+3hTmSCievjHHvvA2ISj82YylBFsgN7yzYt7WrvBVSxrqIcbIvB8ADRsZsEVqxBNJQ8UglA5J9hlNYznvFqhsMtU95q03d7LvIA66uqKK4sY3RwiBOfHuPf0Zvxenl3nZqVMA+uv2Sb4cALnuLTPMBelc/+Nw7w7sG3+P3nswxcvMyz27ayrrKc8Rtj/Hr6DLE7k6iC5fOQNACcV9Ge8FbgW786VAtc67tK29cn6b3QTfR2FNFxt1paU1ZWTlXdUzy/czuu7RvsNt+ixE1TQ3rSIRaZYDDcz/iNUYKrgzxUUUHeqgIkz0K07yI67IhbmtCjHwL7/HtGUMRPJCVp0kDNHutZxOlHgerQ/gQhrX4FcSJpJCl+Exfq3pp5JFPrXc+Z1vSEV6BaxY9MmXXN/OZTibY5Obpb/AnSuYr2vRbE9X73lmmdgen2mhdqcqm9F6jm5Elfyl5H3KNmYLXY1m6wZO61zGTiiBmrLJb1AkfSx5DTvGGC97AZWOXa+sxEr2O2LjgZ7HHgUI6Z7Z1pkjdnJvwvBrlpE76lPRpPY3dpf2yYIRyW7uebDCGR0w9i/wG/FcXEL3c+HgAAAABJRU5ErkJggg==");    

    this.show = function() {
        image(this.img, this.x, this.y, this.r*2, this.r*2);
        //fill(111,0,200);
        //circle(this.x, this.y, this.r*2, this.r*2);
        //fill('white');
        //textSize(this.r);
        //text('G', this.x - this.r/2, this.y + this.r/2);
    }

    this.inflate = function() {
        this.r += 2;
        this.health--;
    }

    this.move = function () {
        this.x += this.xDir;
    }

    this.shiftDown = function() {
        this.y += this.r;
        this.xDir *= -1;
    }

    this.pop = function(balloons, index) {
        balloons.splice(index, 1);
    }

    this.hits = function(obj) {
        var d = dist(this.x, this.y, obj.x, obj.y);
        return d < this.r + obj.r;
    }
}