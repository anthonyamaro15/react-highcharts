function regression(x: any, y: any, typ: any) {
   var type = typ == null ? "linear" : typ;
   var N = x.length;
   var slope;
   var intercept;
   var SX = 0;
   var SY = 0;
   var SXX = 0;
   var SXY = 0;
   var SYY = 0;
   var Y = [];
   var X = [];

   if (type === "linear") {
      X = x;
      Y = y;
   } else if (type === "exp" || type === "exponential") {
      for (let i = 0; i < y.length; i++) {
         // ignore points <= 0, log undefined.
         if (y[i] <= 0) {
            N--;
         } else {
            X.push(x[i]);
            Y.push(Math.log(y[i]));
         }
      }
   }

   for (let i = 0; i < N; i++) {
      SX = SX + X[i];
      SY = SY + Y[i];
      SXY = SXY + X[i] * Y[i];
      SXX = SXX + X[i] * X[i];
      SYY = SYY + Y[i] * Y[i];
   }

   slope = (N * SXY - SX * SY) / (N * SXX - SX * SX);
   intercept = (SY - slope * SX) / N;

   return [slope, intercept];
}

function linearRegression(X: any, Y: any) {
   var ret;
   ret = regression(X, Y, "linear");
   return [ret[0], ret[1]];
}

function expRegression(X: any, Y: any) {
   var ret;
   var x = X;
   var y = Y;
   ret = regression(x, y, "exp");
   var base = Math.exp(ret[0]);
   var coeff = Math.exp(ret[1]);
   return [base, coeff];
}

function fitData(data: any, typ: any) {
   var type = typ === null ? "linear" : typ;
   var ret;
   var res;
   var x = [];
   var y = [];
   var ypred = [];

   for (let i = 0; i < data.length; i++) {
      if (
         data[i] != null &&
         Object.prototype.toString.call(data[i]) === "[object Array]"
      ) {
         if (data[i] != null && data[i][0] != null && data[i][1] != null) {
            x.push(data[i][0]);
            y.push(data[i][1]);
         }
      } else if (data[i] != null && typeof data[i] === "number") {
         //If type of X axis is category
         x.push(i);
         y.push(data[i]);
      } else if (
         data[i] != null &&
         Object.prototype.toString.call(data[i]) === "[object Object]"
      ) {
         if (data[i] != null && data[i].x != null && data[i].y != null) {
            x.push(data[i].x);
            y.push(data[i].y);
         }
      }
   }

   if (type === "linear") {
      ret = linearRegression(x, y);
      for (let i = 0; i < x.length; i++) {
         res = ret[0] * x[i] + ret[1];
         ypred.push([x[i], res]);
      }

      return {
         data: ypred,
         slope: ret[0],
         intercept: ret[1],
         y: function (x: any) {
            return this.slope * x + this.intercept;
         },
         x: function (y: any) {
            return (y - this.intercept) / this.slope;
         },
      };
   } else if (type === "exp" || type === "exponential") {
      ret = expRegression(x, y);
      for (let i = 0; i < x.length; i++) {
         res = ret[1] * Math.pow(ret[0], x[i]);
         ypred.push([x[i], res]);
      }
      ypred.sort();

      return {
         data: ypred,
         base: ret[0],
         coeff: ret[1],
      };
   }
}

export { fitData };
