content=input('输入内容:')
# str
num=0
letter=0
# v=content.isalpha()
# num
# d=content.isdigit()
for item in content:
    # print(item)
    if item.isalpha():
        num +=1
        print('str')
    elif item.isdigit():
        letter +=1
        print('num')
print(num)
print(letter)
