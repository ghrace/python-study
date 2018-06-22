a=10
b=0
try:
    c=a/b
    print(c)
except ZeroDivisionError:
    print('err')
else:
    print('no err')
finally:
    print('always')
print('done')

