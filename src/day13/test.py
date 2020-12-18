t=int(buses[0])                                     #Defining the start time equal to the first value in the 
step=int(buses[0])                                  #This is what we will increment the time by
for x in buses[1:]:
  if (''.join(re.findall('[0-9]', x))) != '':       #Proceed only if x is a number
    while(True):
      if (t+buses.index(x)) % int(x) == 0:          #The index value of the number is how far it is from the first number
        #print(t)
        break;
      t += step                                     #incrementing time with LCM of current number in the loop and the previous number
    step = np.lcm(step, int(x))#int(x)              #Making sure to take the LCM in case some number in the input is not a prime number

print('Part 2: ', t)
