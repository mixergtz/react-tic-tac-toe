"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Square(props) {
  return React.createElement(
    "button",
    { className: "square" + (props.winner ? " winner" : ""), onClick: function onClick() {
        return props.onClick();
      } },
    props.value
  );
}

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: "renderSquare",
    value: function renderSquare(i) {
      var _this2 = this;

      return React.createElement(Square, { value: this.props.squares[i], onClick: function onClick() {
          return _this2.props.onClick(i);
        }, winner: this.props.winner_combination.includes(i) });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var rows = [];

      var _loop = function _loop(i) {
        rows.push(React.createElement(
          "div",
          { className: "board-row", key: i },
          [].concat(_toConsumableArray(Array(3))).map(function (x, j) {
            return React.createElement(
              "span",
              { key: i + j },
              _this3.renderSquare(i + j)
            );
          })
        ));
      };

      for (var i = 0; i <= 6; i += 3) {
        _loop(i);
      }

      return React.createElement(
        "div",
        null,
        React.createElement("div", { className: "status" }),
        rows
      );
    }
  }]);

  return Board;
}(React.Component);

var Game = function (_React$Component2) {
  _inherits(Game, _React$Component2);

  function Game() {
    _classCallCheck(this, Game);

    var _this4 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

    _this4.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      movesAscOrder: true,
      xIsNext: true,
      stepNumber: 0
    };
    return _this4;
  }

  _createClass(Game, [{
    key: "handleClick",
    value: function handleClick(i) {
      //const history = this.state.history;
      var history = this.state.history.slice(0, this.state.stepNumber + 1);
      var current = history[this.state.stepNumber];
      var squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length
      });
    }
  }, {
    key: "jumpTo",
    value: function jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 ? false : true
      });
    }
  }, {
    key: "sortMoves",
    value: function sortMoves() {
      this.setState({ movesAscOrder: !this.state.movesAscOrder });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var history = this.state.history;
      var current = history[this.state.stepNumber];
      var winner = calculateWinner(current.squares);
      var moves = history.map(function (step, move) {
        var desc = move ? "Move #" + move : "Game Start";
        return React.createElement(
          "li",
          { key: move, className: _this5.state.stepNumber == move ? 'current' : '' },
          React.createElement(
            "a",
            { href: "#", onClick: function onClick() {
                return _this5.jumpTo(move);
              } },
            desc
          )
        );
      });

      var status = void 0;
      if (winner) {
        status = "Winner: " + winner["winner"];
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
      return React.createElement(
        "div",
        { className: "game" },
        React.createElement(
          "div",
          { className: "game-board" },
          React.createElement(Board, {
            squares: current.squares,
            onClick: function onClick(i) {
              return _this5.handleClick(i);
            },
            winner_combination: winner ? winner["winner_combination"] : []
          })
        ),
        React.createElement(
          "div",
          { className: "game-info" },
          React.createElement(
            "a",
            { href: "#", onClick: function onClick() {
                return _this5.sortMoves();
              } },
            "Sort order"
          ),
          React.createElement(
            "div",
            null,
            status
          ),
          React.createElement(
            "ol",
            null,
            this.state.movesAscOrder ? moves : moves.reverse()
          )
        )
      );
    }
  }]);

  return Game;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(Game, null), document.getElementById('container'));

function calculateWinner(squares) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (var i = 0; i < lines.length; i++) {
    var _lines$i = _slicedToArray(lines[i], 3),
        a = _lines$i[0],
        b = _lines$i[1],
        c = _lines$i[2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // console.log(a)
      // console.log(b)
      // console.log(c)
      return { winner_combination: [a, b, c], winner: squares[a] };
    }
  }
  return null;
}
