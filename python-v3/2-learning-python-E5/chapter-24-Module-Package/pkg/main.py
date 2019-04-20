# -*- charset: utf-8 -*-

# this import both work on 2.X and 3.X, with nonpackage import mode.
# but fail on package import mode on 3.X only.
# import m1

# this import only work for package import. that's say, import main.py as import pkg.main.
from . import m1

print('main script run.')

if __name__ == '__main__':
    print('main.py run as top level script')
