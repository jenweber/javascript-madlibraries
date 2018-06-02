import Service from '@ember/service';
import nlp from 'npm:compromise'

export default Service.extend({
    /**
     * Text is free form blob. Data is the structure to
     * apply the results of parsing to. Returns the completed
     * data object.
     * @param {string} text 
     * @param {string} data 
     */
    extract(text, data) {
        let results = this.assignValues(text, data)
        results = this.fillMissingInfo(results, this.defaults)
        return results
    },
    defaults: Object.freeze({
        adjective: ['destructive', 'delightful', 'prickly', 'enchanting', 'greedy', 'inevitable', 'miniscule'],
        verb: ['explode', 'smoosh', 'launch', 'escape', 'scorch'],
        animal: ['penguins', 'armadillos', 'pandas', 'kangaroos', 'platypuses', 'cockroaches', 'yetis', 'corgis'],
        adverb: ['gently', 'politely', 'obscenely', 'tediously', 'bravely', 'unbearably'],
        bodyPart: ['nostril', 'earlobe', 'kidney', 'eye', 'ventricle', 'muffintop'],
        noun: ['mountain', 'popcorn', 'brick', 'cookie', 'Hawaiian Pizza'],
        dateTime: ['the heat death of the universe', 'the end of the reign of Cleopatra', 'last Tuesday', 'February 31st, 2019'],
        gerund: ['skiiing', 'believing', 'removing', 'smashing', 'deceiving']
    }),
    assignValues(text, data) {
        let nlptext = nlp(text)
        let options = {
            verb: this.findVerbs(nlptext),
            adverb: this.findAdverbs(nlptext),
            noun: this.findNouns(nlptext),
            dateTime: this.findDates(nlptext),
            bodyPart: this.findBodyPart(nlptext),
            animal: this.findAnimal(nlptext),
            gerund: this.findGerunds(nlptext),
            adjective: this.findAdjective(nlptext)
        }
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let partOfSpeech = data[key]['partOfSpeech']
                let result = this.chooseRandomItem(options[partOfSpeech])
                if (data[key]['plural']) {
                    result = this.makePlural(result)
                }
                if (data[key]['tense'] === 'past') {
                    result = this.makePast(result)
                }
                data[key]['val'] = result
            }
        }
        return data
    },

    /**
     * If any fields are empty, fill them with one of the defaults
     * @param {object} data 
     */
    fillMissingInfo(data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (!data[key]['val']) {
                    let partOfSpeech = data[key]['partOfSpeech']
                    data[key]['val'] = this.chooseRandomItem(this.defaults[partOfSpeech])

                }
            }
        }
        return data
    },

    chooseRandomItem(arr) {
        if (arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        } else {
            return ''
        }
    },
    
    makePlural(noun) {
        return nlp(noun).nouns().toPlural().all().out()
    },

    makePast(verb) {
        return nlp(verb).verbs().toPastTense().out()
    },

    findAdjective(text) {
        return text.adjectives().data().map(x => x.normal)
    },
    /**
     * returns an array of nouns, like ['bicycle', 'wookie']
     * @param {string} text 
     */
    findNouns(text) {
        return text.nouns().data().map(x => x.text)
    },
    findVerbs(text) {
        return text.verbs().data().map(x => x.normal)
    },
    findAdverbs(text) {
        return text.adverbs().data().map(x => x.text)
    },
    findGerunds(text) {
        let verbs = text.verbs().data().map(x => x.normal)
        let gerunds = []
        verbs.forEach(function(verb) {
            if (verb.includes('ing')) {
                gerunds.push(verb)
            }
        })
        return gerunds
    },
    findDates(text) {
        return text.dates().data().map(x => x.text)
    },
    findAnimal(text) {
        let animalResult = '' 
        this.animalList.split(',').forEach(function(animal) {
            let match = text.match(animal).out()
            animalResult = match ? match : animalResult;
        })
        // lazy coding, return only 1 result, but other results are arrays,
        // so make it an array too
        return [animalResult]
    },
    findBodyPart(text) {
        let bodyPartResult = ''
        this.bodyPartList.split(',').forEach(function (part) {
            let match = text.match(part).out()
            bodyPartResult = match ? match : bodyPartResult;
        })
        // lazy coding, return only 1 result, but other results are arrays,
        // so make it an array too
        return [bodyPartResult]
    },
    // animal and body part lists from http://www.enchantedlearning.com/wordlist/
    bodyPartList: "abdomen,Adam's apple,adenoids,adrenal gland,anatomy,ankle,anus,appendix,arch,arm,artery,back,ball of the foot,belly,belly button,big toe,bladder,blood,blood vessels,body,bone,brain,breast,buttocks,calf,capillary,carpal,cartilage,cell,cervical vertebrae,cheek,chest,chin,circulatory system,clavicle,coccyx,collar bone,diaphragm,digestive system,ear,ear lobe,elbow,endocrine system,esophagus,eye,eyebrow,eyelashes,eyelid,face,fallopian tubes,feet,femur,fibula,filling,finger,fingernail,follicle,foot,forehead,gallbladder,glands,groin,gums,hair,hand,head,heart,heel,hip,humerus,immune system,instep,index finger,intestines,iris,jaw,kidney,knee,larynx,leg,ligament,lip,liver,lobe,lumbar vertebrae,lungs,lymph node,mandible,metacarpal,metatarsal,molar,mouth,muscle,nail,navel,neck,nerves,nipple,nose,nostril,organs,ovary,palm,pancreas,patella,pelvis,phalanges,pharynx,pinky,pituitary,pore,pupil,radius,rectum,red blood cells,respiratory system,ribs,sacrum,scalp,scapula,senses,shin,shoulder,shoulder blade,skeleton,skin,skull,sole,spinal column,spinal cord,spine,spleen,sternum,stomach,tarsal,teeth,tendon,testes,thigh,thorax,throat,thumb,thyroid,tibia,tissue,toe,toenail,tongue,tonsils,tooth,torso,trachea,ulna,ureter,urethra,urinary system,uterus,uvula,vein,vertebra,waist,white blood cells,wrist",
    animalList: "aardvark,abalone,African gray parrot,African penguin,African elephant,African rock python,African wild cat,albatross,algae,agouti,airedale terrier,Alaskan malamute,alligator,alpaca,amoeba,American bison,American cocker spaniel,American crocodile,American flamingo,American golden plover,American Robin,American tree sparrow,amphibian,anaconda,angelfish,angelshark,angonoka,animal,anole,ant,anteater,antelope,Apatosaurus,ape,aphid,arachnid,archaeopteryx,arctic fox,Arctic tern,arctic wolf,armadillo,Arsinoitherium,arthropod,artiodactyls,asp,assassin bug,aye-aye,baboon,bactrian camel,badger,bald eagle,bandicoot,barnacle,barracuda,basilisk,basking shark,bass,basset hound,bat,beagle,bear,bearded dragon,beaver,bed bug,bee,beetle,beluga whale,bichon frise,bighorn sheep,bilby,binturong,bird,bison,bivalve,black bear,black bear hamster,blackbird,black caiman,black racer,black swan,bloodhound,blowfish,bluebird,bluefin tuna,blue jay,blue morpho butterfly,blue ring octopus,blue shark,blue-tongued skink,blue whale,boa constrictor,bobcat,bongo,bonobo,bony fish,border collie,Boston terrier,bowhead whale,boxer,brittle star,brown bear,brown pelican,box turtle,brittle star,bug,buffalo,bull,bulldog,bullfrog,bull shark,bull snake,bumblebee,bushbaby,butterfly,caiman,California sea lion,camel,canary,cape buffalo,capybera,Canada goose,Cape hunting dog,caracal,cardinal,caribou,carnivora,cassowary,carpenter ant,cat,catamount,caterpillar,cattle,cavy,centipede,cephalpod,chameleon,cheetah,chickadee,chicken,chihuahua,chimipanzee,chinchilla,chipmunk,chiton,chrysalis,cicada,clam,clownfish,coati,cobra,cockatoo,cod,coelacanth,cockroach,collared lizard,collared peccary,collie,colugo,common rhea,companion dog,conch,cookiecutter shark,copepod,copperhead snake,coral,coral snake,corn snake,cottonmouth,cougar,cow,coyote,coypu,crab,crane,crayfish,cricket,crocodile,crow,crustacean,Cryptoclidus,cuttlefish,cutworm,Dachshund,dall sheep,Dall's porpoise,Dalmatian,dark-eyed junco,damselfly,darkling beetle,deer,Deinonychus,desert tortoise,Desmatosuchus,dhole,diatom,Dilophosaurus,Dimetrodon,Dinichthys,dingo,Dinornis,dinosaur,Diplodocus,Doberman pinscher,dodo,Doedicurus,dog,dogfish,dolphin,dolphin, bottlenose,dolphin, spotted,donkey,dory,dove,downy woodpecker,dragonfly,dromedary,duck,dugong,duck-billed platypus,dugong,dung beetle,Dunkleosteus,eagle,earthworm,earwig,eastern bluebird,eastern quoll,echidna,echinoderms,Edenta,Edmontonia,Edmontosaurus,eel,egg,egret,ekaltadelta,eland,Elasmosaurus,Elasmotherium,electric eel,elephant,elephant seal,elk,emerald tree boa,emperor angelfish,emperor penguin,emu,endangered species,Eohippus,Eoraptor,ermine,Estemmenosuchus,extinct animals,Fabrosaurus,falcon,farm animals,fennec fox,ferret,fiddler crab,finch,fin whale,fireant,firefly,fish,flamingo,flatworm,flea,flightless birds,flounder,fly,flying fish,flying squirrel,forest antelope,forest giraffe,fossa,fowl,fox,frilled lizard,frog,fruit bat,fruit fly,fugu,galagos,Galapagos shark,gar,gastropod,gavial,gazelle,gecko,gerbil,German shepherd,giant squid,gibbon,gila monster,giraffe,Glyptodon,gnat,gnu,goat,golden eagle,golden lion tamarin,golden retriever,goldfinch,goldfish,goose,gopher,gorilla,grasshopper,gray whale,great apes,great Dane,great egret,great horned owl,great white shark,green darner dragonfly,green iguana,Greenland shark,greyhound,grizzly bear,groundhog,grouper,grouse,grub,guinea pig,gull,gulper eel,hammerhead shark,hamster,hare,harlequin bug,harp seal,harpy eagle,hatchetfish,Hawaiian goose,hawk,hedgehog,hen,hermit crab,heron,herring,hippo,hippopotamus,honey bee,hornet,horse,horseshoe crab,hound,house fly,howler monkey,human being,hummingbird,humpback whale,husky,hyena,Hyracotherium,hyrax,ibis,Ichthyornis,Ichthyosaurus,iguana,Iguanodon,imago,impala,Indian elephant,insect,insectivores,invertebrates,Irish setter,isopod,jack rabbit,Jack Russell terrier,jaguar,Janenschia,Japanese crane,javelina,jay,jellyfish,jerboa,joey,John Dory,jumping bean moth,junebug,junco,kakapo,kangaroo,kangaroo rat,karakul,katydid,keel-billed toucan,Kentrosaurus,killer whale,king cobra,king crab,kinkajou,kiwi,knobbed whelk,koala,Komodo dragon,kookaburra,krill,Kronosaurus,Kudu,Labrador retriever,ladybug,lagomorph,lake trout,lanternfish,larva,leafcutter ant,leghorn,lemming,lemon shark,lemur,leopard,Lhasa apso,lice,lightning bug,limpet,lion,Liopleurodon,lizard,llama,lobster,locust,loggerhead turtle,longhorn,loon,lorikeet,loris,louse,luminous shark,luna moth,lynx,macaque,macaw,mackerel,Macrauchenia,maggot,mako shark,mallard duck,mammal,mammoth,manatee,mandrill,mamba,man-o'-war,manta ray,mantid,mantis,marbled murrelet,marine mammals,marmoset,marmot,marsupial,mastiff,mastodon,meadowlark,mealworm,meerkat,Megalodon,megamouth shark,merganser,midge,migrate,millipede,mink,minnow,mice,mockingbird,moa,mockingbird,mole,mollusk,monarch butterfly,mongoose,monitor lizard,monkey,monotreme,moose,moray eel,Morganucodon,morpho butterfly,mosquito,moth,mountain lion,mouse,mudpuppy,musk ox,muskrat,mussels,mustelids,nabarlek,naked mole-rat,nandu,narwhal,nautilus,nene,nest,newt,nightingale,nine-banded armadillo,North American beaver,North American porcupine,northern cardinal,northern elephant seal,northern fur seal,northern right whale,numbat,nurse shark,nuthatch,nutria,nymph,ocelot,octopus,okapi,old English sheepdog,onager,opossum,orangutan,orca,Oregon silverspot butterfly,oriole,Ornitholestes,Ornithomimus,oropendola,Orthacanthus,oryx,ostrich,otter, river,otter, sea,Oviraptor,owl,ox,oxpecker,oyster,painted lady butterfly,painted turtle,panda,pangolin,panther,parakeet,parrot,peacock,peafowl,pekingese,pelican,penguin,peregrine falcon,Perissodactyls,petrel,pig,pigeon,pika,pill bug,pinnipeds,piranha,placental mammals,plankton,platybelodon,platypus,ploughshare tortoise,plover,polar bear,polliwog,pomeranian,pompano,pond skater,poodle,porcupine,porpoise,Port Jackson shark,Portuguese water dog,Postosuchus,prairie chicken,praying mantid,praying mantis,primates,Proboscideans,pronghorn,protozoan,pufferfish,puffin,pug,puma,pupa,pupfish,python,Quaesitosaurus,quagga,quail,Queen Alexandra's birdwing,queen conch,quetzal,quokka,quoll,rabbit,raccoon,rat,rattlesnake,ray,redbilled oxpecker,red hooded duck,red-tailed hawk,red kangaroo,red panda,red wolf,reindeer,reptile,rhea,rhino,rhinoceros,Rhode Island red,right whale,ring-billed gull,ring-tailed lemur,ringtail possum,river otter,roadrunner,roach,robin,rock dove,rockhopper penguin,rodent,rooster,rottweiler,roundworm,ruby-throated hummingbird,sailfish,salamander,salmon,sand dollar,sandpiper,scallop,scarlet macaw,scorpion,Scottish terrier,sea anemone,sea cow,sea cucumber,sealion,sea cucumber,seahorse,seal,sea otter,sea star,sea turtle,sea urchin,sea worm,serval,shark,sheep,shrew,shrimp,siamang,Siberian husky,silkworm,silverfish,skink,skipper,skunk,sloth,slow worm,slug,Smilodon,snail,snake,snapper,snapping turtle,snow goose,snow leopard,snowy owl,softshell turtle,sparrow,spectacled caiman,spectacled porpoise,spider,spiny anteater,spiny lizard,sponge,spotted owl,springtail,squid,squirrel,starfish,starling,St. Bernard,Stegosaurus,stingray,stonefly,stork,sugar glider,sunfish,swallowtail butterfly,swan,swift,swordfish,tadpole,tamarin,tanager,tapir,tarantula,tarpon,tarsier,Tasmanian devil,Tasmanian tiger,termite,tern,terrier,Teratosaurus,Thecodontosaurus,Thescelosaurus,three-toed sloth,thresher shark,thrip,tick,tiger,tiger shark,tiger swallowtail butterfly,toad,Torosaurus,tortoise,toucan,Trachodon,treefrog,tree shrew,tree sparrow,Triceratops,Trilobite,Troodon,trout,trumpeter swan,tuatara,tsetse fly,tuna,tundra wolf,turkey,turtle,T. rex,Tyrannosaurus rex,Ultrasaurus,Ulysses butterfly,umbrellabird,ungulates,uniramians,urchin,Utahraptor,valley quail,vampire bat,veiled chameleon,Velociraptor,venomous animals,vertebrates,viceroy butterfly,vinegarroon,viper,Virginia opossum,Vulcanodon,vulture,walkingstick,wallaby,walrus,warthog,wasp,waterbug,water moccasin,water strider,weasel,Weddell seal,weevil,western meadowlark,western spotted owl,west highland white terrier,whale,whale shark,whelk,whippet,whip scorpion,white Bengal tiger,white-breasted nuthatch,white dove,white pelican,white rhinoceros,white-spotted dolphin,white-tailed deer,white tiger,wild cat,wild dog,wildebeest,wolf,wolverine,wombat,woodchuck,woodland caribou,wood louse,woodpecker,woolly bear caterpillar,woolly mammoth,woolly rhinoceros,working dog,worm,wren,Xenarthra (Edentata),xenops,Xiaosaurus,yak,yellowjacket,yellow mealworm,yellow mongoose,Yorkshire terrier,zebra,zebra bullhead shark,zebra longwing butterfly,zebra swallowtail butterfly,zooplankton,zorilla,zorro"
});
