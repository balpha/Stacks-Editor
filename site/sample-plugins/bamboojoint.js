window.BambooJoint = (function () {
    if (!document.createElement("canvas").getContext)
        return {
            render: function () {
                return null;
            },
        };

    // lyfe.js
    (function (l) {
        var q;
        q = Array.prototype.indexOf
            ? function (a, b) {
                  return a.indexOf(b);
              }
            : function (a, b) {
                  for (var c = a.length, d = 0; d < c; d++)
                      if (d in a && a[d] === b) return d;
                  return -1;
              };
        var m = {},
            e = function (a) {
                if (!(this instanceof e)) return new e(a);
                this.forEach =
                    "function" === typeof a
                        ? n(a)
                        : a.constructor === Array
                        ? u(a)
                        : v(a);
            },
            r = function () {
                throw m;
            },
            p = function (a) {
                this.message = a;
                this.name = "IterationError";
            };
        p.prototype = Error.prototype;
        var n = function (a) {
                return function (b, c) {
                    var d = !1,
                        f = 0,
                        g = function (a) {
                            if (d) throw new p("yield after end of iteration");
                            a = b.call(c, a, f, r);
                            f++;
                            return a;
                        },
                        x = function (a) {
                            a = a instanceof e ? a : new e(a);
                            a.forEach(function (a) {
                                g(a);
                            });
                        };
                    try {
                        a(g, x, r);
                    } catch (k) {
                        if (k !== m) throw k;
                    } finally {
                        d = !0;
                    }
                };
            },
            u = function (a) {
                return n(function (b) {
                    for (var c = a.length, d = 0; d < c; d++) d in a && b(a[d]);
                });
            },
            v = function (a) {
                return n(function (b) {
                    for (var c in a) a.hasOwnProperty(c) && b([c, a[c]]);
                });
            },
            h = function (a) {
                return "string" === typeof a
                    ? function (b) {
                          return b[a];
                      }
                    : a;
            };
        e.prototype = {
            toArray: function () {
                var a = [];
                this.forEach(function (b) {
                    a.push(b);
                });
                return a;
            },
            filter: function (a, b) {
                var c = this;
                a = h(a);
                return new e(function (d) {
                    c.forEach(function (c) {
                        a.call(b, c) && d(c);
                    });
                });
            },
            take: function (a) {
                var b = this;
                return new e(function (c) {
                    b.forEach(function (b, f, e) {
                        f >= a && e();
                        c(b);
                    });
                });
            },
            skip: function (a) {
                var b = this;
                return new e(function (c) {
                    b.forEach(function (b, f) {
                        f >= a && c(b);
                    });
                });
            },
            map: function (a, b) {
                var c = this;
                a = h(a);
                return new e(function (d) {
                    c.forEach(function (c) {
                        d(a.call(b, c));
                    });
                });
            },
            zipWithArray: function (a, b) {
                "undefined" === typeof b &&
                    (b = function (a, b) {
                        return [a, b];
                    });
                var c = this;
                return new e(function (d) {
                    var e = a.length,
                        g = 0;
                    c.forEach(function (c, k, w) {
                        for (; !(k + g in a) && k + g < e; ) g++;
                        k + g >= e && w();
                        d(b(c, a[k + g]));
                    });
                });
            },
            reduce: function (a, b) {
                var c, d;
                2 > arguments.length ? (c = !0) : ((c = !1), (d = b));
                this.forEach(function (b) {
                    c ? ((d = b), (c = !1)) : (d = a(d, b));
                });
                return d;
            },
            and: function (a) {
                var b = this;
                return new e(function (c, d) {
                    d(b);
                    d(a);
                });
            },
            takeWhile: function (a) {
                var b = this;
                a = h(a);
                return new e(function (c) {
                    b.forEach(function (b, e, g) {
                        a(b) ? c(b) : g();
                    });
                });
            },
            skipWhile: function (a) {
                var b = this;
                a = h(a);
                return new e(function (c) {
                    var d = !0;
                    b.forEach(function (b) {
                        (d = d && a(b)) || c(b);
                    });
                });
            },
            all: function (a) {
                var b = !0;
                a = h(a);
                this.forEach(function (c, d, e) {
                    (a ? a(c) : c) || ((b = !1), e());
                });
                return b;
            },
            any: function (a) {
                var b = !1;
                a = h(a);
                this.forEach(function (c, d, e) {
                    if (a ? a(c) : c) (b = !0), e();
                });
                return b;
            },
            first: function () {
                var a;
                this.forEach(function (b, c, d) {
                    a = b;
                    d();
                });
                return a;
            },
            groupBy: function (a) {
                var b = this;
                a = h(a);
                return new e(function (c, d) {
                    var f = [],
                        g = [];
                    b.forEach(function (b) {
                        var c = a(b),
                            d = q(f, c);
                        -1 === d ? (f.push(c), g.push([b])) : g[d].push(b);
                    });
                    d(
                        new e(f).zipWithArray(g, function (a, b) {
                            var c = new e(b);
                            c.key = a;
                            return c;
                        })
                    );
                });
            },
            evaluated: function () {
                return new e(this.toArray());
            },
            except: function (a) {
                return this.filter(function (b) {
                    return b !== a;
                });
            },
            sortBy: function (a) {
                var b = this;
                a = h(a);
                return new e(function (c) {
                    var d = b.toArray(),
                        f = s(0, d.length).toArray();
                    f.sort(function (b, c) {
                        var e = a(d[b]),
                            f = a(d[c]);
                        if (typeof e === typeof f) {
                            if (e === f) return b < c ? -1 : 1;
                            if (e < f) return -1;
                            if (e > f) return 1;
                        }
                        throw new TypeError(
                            "cannot compare " + e + " and " + f
                        );
                    });
                    new e(f).forEach(function (a) {
                        c(d[a]);
                    });
                });
            },
            count: function () {
                var a = 0;
                this.forEach(function () {
                    a++;
                });
                return a;
            },
        };
        var t = function (a, b) {
                var c = a;
                "undefined" === typeof b && (b = 1);
                return new e(function (a) {
                    for (;;) a(c), (c += b);
                });
            },
            s = function (a, b) {
                return t(a, 1).take(b);
            },
            y = l.Generator;
        l.Generator = e;
        e.BreakIteration = m;
        e.Count = t;
        e.Range = s;
        e.IterationError = p;
        e.noConflict = function () {
            l.Generator = y;
            return e;
        };
    })(window);
    Generator = Generator.noConflict();

    function parse(text) {
        text = text.replace(/\r/g, "\n");
        var lines = Generator(text.split(/\n+/))
                .filter(function (l) {
                    return /\S/.test(l);
                })
                .evaluated(),
            result = { board: [] },
            board = result.board;

        if (
            lines.any(function (line) {
                return !/^\$\$/.test(line);
            })
        ) {
            return null;
        }

        var firstLine = lines.first(),
            coordinates;

        if (!firstLine) return null;

        result.moveDelta = 0;

        // check the first line for options and/or caption
        // note that we're not actually replacing (and not storing the result), and that the function gets called at most once
        firstLine.replace(
            /^\$\$(([BW]?)(c?)(\d*)(?:m(\d+))?)(?:\s+(.*)|)$/,
            function (whole, options, color, coord, size, firstMove, caption) {
                caption = (caption || "").replace(/\s+$/, "");
                if (!options.length) {
                    // no options -- is this a regular board markup line, or is there a caption?

                    if (!caption.length)
                        // no caption at all -- we're outta here
                        return;

                    if (!/[^\sOW@QPXB#YZCSTM\d?a-z,*+|_-]/.test(caption)) {
                        // all characters are legal markup
                        if (!/\w{2} \w{2}/.test(caption))
                            // doesn't seem to be words
                            return;
                    }
                }

                result.whiteFirst = color === "W";
                coordinates = coord === "c";

                var sizeInt = parseInt(size, 10);
                if (isFinite(sizeInt)) result.boardSize = sizeInt;

                var firstMoveInt = parseInt(firstMove, 10);
                if (isFinite(firstMoveInt)) result.moveDelta = firstMoveInt - 1;

                result.caption = caption;

                lines = lines.skip(1);
            }
        );

        var lastRow;

        lines.forEach(function (line) {
            if (/^\$\$\s(?:[|+-]\s*){2,}$/.test(line)) {
                // currently, only full horizontal edges are considered
                if (lastRow) lastRow.bottom = true;
                if (!board.length || board[board.length - 1].length) {
                    lastRow = [];
                    board.push(lastRow);
                }
                board[board.length - 1].top = true;
                return;
            }
            if (!board.length || board[board.length - 1].length) {
                lastRow = [];
                board.push(lastRow);
            }
            var pieces = Generator(function (Yield) {
                var l = line.length,
                    c;
                for (var i = 0; i < l; i++) {
                    c = line.charAt(i);
                    if (!/[$\s]/.test(c)) Yield(c);
                }
            });

            var lastField,
                nextIsLeft = false;

            pieces.forEach(function (piece) {
                if (/[|+-]/.test(piece)) {
                    if (lastField) lastField.right = true;
                    nextIsLeft = true;
                    return;
                }
                var field = { piece: piece };
                if (nextIsLeft) field.left = true;
                nextIsLeft = false;
                lastRow.push(field);
                lastField = field;
            });
        });

        // last row is empty
        if (board.length && !board[board.length - 1].length) board.pop();

        var width = 0,
            height = 0;
        if (!board.length) {
            //console.log("empty")
            return null;
        } else {
            var diff = false,
                width = Generator(board)
                    .map(function (r) {
                        return r.length;
                    })
                    .reduce(function (a, b) {
                        diff = diff || a !== b;
                        return Math.max(a, b);
                    });
            height = board.length;
            if (diff) {
                return null; // the rows don't have equal widths
            }
        }

        if (coordinates) {
            var leftEdge = board[0][0].left,
                rightEdge = board[0][width - 1].right,
                topEdge = board[0].top,
                bottomEdge = board[height - 1].bottom;

            var boardSize = result.boardSize;
            if (!boardSize) {
                boardSize = 19;
                if (leftEdge && rightEdge) boardSize = width;
                else if (topEdge && bottomEdge) boardSize = height;
            }
            if (leftEdge) result.leftCoordinate = 0;
            else if (rightEdge) result.leftCoordinate = boardSize - width;
            else coordinates = false;

            if (topEdge) result.topCoordinate = boardSize - 1;
            else if (bottomEdge) result.topCoordinate = height - 1;
            else coordinates = false;

            if (coordinates) result.coordinates = true;
        }

        result.width = width;
        result.height = height;
        return result;
    }

    var stoneImages = {};

    function createStoneImages(scale) {
        return {
            white: createStoneImage("white", scale),
            black: createStoneImage("black", scale),
            both: createStoneImage("both", scale),
        };
    }

    function createStoneImage(color, scale) {
        var stone, actualColor, angle1, angle2;
        if (color === "both") {
            stone = createStoneImage("black", scale);
            actualColor = "white";
            angle1 = 0.5 * Math.PI;
            angle2 = 1.5 * Math.PI;
        } else {
            stone = document.createElement("canvas");
            stone.width = 29 * scale;
            stone.height = 29 * scale;
            actualColor = color;
            angle1 = 0;
            angle2 = 2 * Math.PI;
        }
        var ctx = stone.getContext("2d");

        ctx.save();
        ctx.fillStyle = actualColor;
        if (color !== "both") {
            ctx.shadowOffsetX = 1 * scale;
            ctx.shadowOffsetY = 1 * scale;
            ctx.shadowBlur = 3 * scale;
            ctx.shadowColor = "rgba(0,0,0,.7)";
        }

        ctx.beginPath();
        ctx.arc(14.5 * scale, 14.5 * scale, 10 * scale, angle1, angle2, false);
        ctx.fill();
        ctx.restore();

        // we're doing this in two steps because of a bug in the android browser
        // http://code.google.com/p/android/issues/detail?id=21813
        ctx.save();
        var gradient = ctx.createRadialGradient(
            14.5 * scale,
            14.5 * scale,
            10 * scale,
            7.5 * scale,
            7.5 * scale,
            2 * scale
        );
        var c1 = actualColor === "white" ? "#e0e0e0" : "black";
        var c2 = actualColor === "black" ? "#404040" : "white";
        gradient.addColorStop(0, c1);
        gradient.addColorStop(0.25, c1);
        gradient.addColorStop(1, c2);
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(14.5 * scale, 14.5 * scale, 10 * scale, angle1, angle2, false);
        ctx.fill();
        ctx.restore();
        return stone;
    }

    function roundUp(x) {
        var rd = x | 0;
        return rd === x ? x : rd + 1;
    }

    function renderParsed(parsed, options) {
        var scale = options.scale;

        var usedStoneImages = (stoneImages[scale] =
            stoneImages[scale] || createStoneImages(scale));

        var pixWidth = (parsed.width + 1) * 22 * scale,
            pixHeight = (parsed.height + 1) * 22 * scale,
            bgColor = "#d3823b";

        if (parsed.coordinates) {
            pixWidth += 6 * scale;
            pixHeight += 6 * scale;
        }

        pixWidth = roundUp(pixWidth);
        pixHeight = roundUp(pixHeight);

        var canvas = document.createElement("canvas");
        canvas.width = pixWidth;
        canvas.height = pixHeight;

        var ctx = canvas.getContext("2d");
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, pixWidth, pixHeight);
        ctx.lineWidth = 1 * scale;
        function stone(x, y, color) {
            ctx.drawImage(
                usedStoneImages[color],
                x - 14.5 * scale,
                y - 14.5 * scale
            );
        }

        function putlines(x, y, top, right, bottom, left) {
            ctx.beginPath();
            ctx.moveTo(x - (left ? 0 : 11 * scale), y);
            ctx.lineTo(x + (right ? 0 : 11 * scale), y);
            ctx.moveTo(x, y - (top ? 0 : 11 * scale));
            ctx.lineTo(x, y + (bottom ? 0 : 11 * scale));
            ctx.stroke();
        }

        function mark_circle(x, y) {
            ctx.save();
            ctx.lineWidth = 2 * scale;
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.arc(x, y, 5 * scale, 0, 2 * Math.PI, false);
            ctx.stroke();
            ctx.restore();
        }
        function mark_square(x, y) {
            ctx.save();
            ctx.fillStyle = "red";
            ctx.fillRect(x - 5 * scale, y - 5 * scale, 10 * scale, 10 * scale);
            ctx.restore();
        }
        function mark_triangle(x, y) {
            ctx.save();
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.moveTo(x, y - 6 * scale);
            ctx.lineTo(x + 6 * scale, y + 4 * scale);
            ctx.lineTo(x - 6 * scale, y + 4 * scale);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        function mark_x(x, y) {
            ctx.save();
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2 * scale;
            ctx.beginPath();
            ctx.moveTo(x - 5 * scale, y - 5 * scale);
            ctx.lineTo(x + 5 * scale, y + 5 * scale);
            ctx.moveTo(x + 5 * scale, y - 5 * scale);
            ctx.lineTo(x - 5 * scale, y + 5 * scale);
            ctx.stroke();
            ctx.restore();
        }

        var edge = parsed.coordinates ? 28.5 * scale : 22.5 * scale;

        Generator(parsed.board).forEach(function (line, row) {
            Generator(line).forEach(function (field, col) {
                var x = col * 22 * scale + edge,
                    y = row * 22 * scale + edge,
                    piece = field.piece;

                if (piece !== "_")
                    putlines(
                        x,
                        y,
                        line.top,
                        field.right,
                        line.bottom,
                        field.left
                    );
                ctx.save();

                if (/[OW@QP]/.test(piece)) stone(x, y, "white");
                else if (/[XB#YZ]/.test(piece)) stone(x, y, "black");

                if (/[BWC]/.test(piece)) mark_circle(x, y);
                else if (/[#@S]/.test(piece)) mark_square(x, y);
                else if (/[YQT]/.test(piece)) mark_triangle(x, y);
                else if (/[ZPM]/.test(piece)) mark_x(x, y);
                else if (piece === "*") stone(x, y, "both");
                else if (/^\d$/.test(piece)) {
                    var val = parseInt(piece, 10);
                    if (val === 0) val = 10;
                    var isBlack = (val % 2 === 1) ^ parsed.whiteFirst;
                    stone(x, y, isBlack ? "black" : "white");
                    ctx.font = 12 * scale + "px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillStyle = isBlack ? "white" : "black";
                    ctx.fillText(val + parsed.moveDelta, x, y + 4 * scale);
                } else if (piece === "?") {
                    ctx.fillStyle = "rgba(255,255,255,0.5)";

                    // using integer coordinates here to avoid seeing very thin lines between adjacent shaded points
                    ctx.fillRect(
                        (x - 11.5 * scale) | 0,
                        (y - 11.5 * scale) | 0,
                        ((x + 10.5 * scale) | 0) - ((x - 11.5 * scale) | 0),
                        ((y + 10.5 * scale) | 0) - ((y - 11.5 * scale) | 0)
                    );
                } else if (/^[a-z]$/.test(piece)) {
                    ctx.font = "bold " + 15 * scale + "px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "black";
                    ctx.lineWidth = 6 * scale;
                    ctx.strokeStyle = bgColor;
                    ctx.strokeText(piece, x, y + 5 * scale);
                    ctx.fillText(piece, x, y + 5 * scale);
                    ctx.lineWidth = 1 * scale;
                } else if (piece === ",") {
                    ctx.fillStyle = "black";
                    ctx.beginPath();
                    ctx.arc(x, y, 2.5 * scale, 0, 2 * Math.PI, false);
                    ctx.fill();
                }
                ctx.restore();
            });
        });

        if (parsed.coordinates) {
            ctx.save();
            ctx.fillStyle = "#6b421e";
            ctx.font = 10 * scale + "px sans-serif";

            for (var row = 0; row < parsed.height; row++) {
                ctx.textAlign = "right";
                ctx.fillText(
                    parsed.topCoordinate - row + 1,
                    16 * scale,
                    (row * 22 + 31.5) * scale
                );
            }
            for (var col = 0; col < parsed.width; col++) {
                ctx.textAlign = "center";

                var letter = parsed.leftCoordinate + col + 1;
                if (letter >= 9)
                    // skip "I"
                    letter++;

                ctx.fillText(
                    String.fromCharCode(64 + letter),
                    (col * 22 + 28.5) * scale,
                    12 * scale
                );
            }
            ctx.restore();
        }

        return {
            canvas: canvas,
            width: pixWidth,
            height: pixHeight,
        };
    }

    return {
        render: function (source, options) {
            options = options || {};
            options.scale = options.scale || 1;

            var parsed = parse(source, options);

            if (!parsed) return null;

            var result = renderParsed(parsed, options);

            if (parsed.caption && parsed.caption.length)
                result.caption = parsed.caption;

            return result;
        },
    };
})();

export default window.BambooJoint;
