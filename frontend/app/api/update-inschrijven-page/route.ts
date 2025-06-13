import { NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export async function POST() {
  try {
    const payload = await getPayloadHMR({ config })
    
    const updatedData = {
      existingMembersSection: {
        title: 'Lid worden',
        content: 'Wilt uw zoon/dochter graag in de scouts? Of twijfelt hij/zij nog?\n\nIeder kind mag steeds tweemaal proberen, nadien dient uw zoon/dochter te beslissen of hij al dan niet lid wil worden van de onze scouts.\nBij het tabblad \'agenda/ratel\' vind je steeds terug waar en wanneer er vergadering plaatsvindt.',
        infoBoxTitle: 'Hoe schrijf ik mijn kind in?',
        infoBoxContent: 'Leden die vorig jaar al ingeschreven waren kunnen zich inloggen op de website van stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kun je de gegevens van het lid controleren. Wanneer je het lidgeld betaald hebt, is je kind ingeschreven. Zijn er binnen je gezin nieuwe leden? Dan klik je bij \'inschrijven\' \'nieuw lid toevoegen\'.\n\nNieuwe leden maken een account aan op stamhoofd. (https://scouts-sint-johannes.stamhoofd.be) Daar kom je terecht op de pagina waar je je zoon/dochter kunt inschrijven met zijn/haar gegevens. Je kunt meerdere kinderen inschrijven onder hetzelfde account. Wanneer dat gebeurt is, ga je naar het tabblad \'afrekeningen\'. Daar zie je onderaan de pagina hoeveel je moet overschrijven naar het juiste rekeningnummer. Dat blijft even staan totdat wij de betaling goedkeurden, wat soms eventjes kan duren. Bij vragen kun je ons steeds bereiken via groepsleiding@scoutssintjohannes.be.\n\nHoeveel bedraagt het lidgeld?\n\nHet lidgeld bedraagt 45 euro per kind.\nVanaf 3 kinderen ingeschreven in de scouts bedraagt het 35 euro per kind.\nHet lidgeld is voor de verzekering die vanuit Scouts en Gidsen Vlaanderen gevraagd wordt.\n\nEr is ook een mogelijkheid voor verminderd lidgeld. We willen ieder kind de kans geven om lid te worden van scouting. Geld mag daarbij geen rol spelen. Voor wie het financieel wat moeilijker is, bestaat het verminderd lidgeld. Je betaalt dan 15 euro lidgeld.',
      }
    }

    const result = await payload.updateGlobal({
      slug: 'inschrijvenPage',
      data: updatedData,
    })

    return NextResponse.json({
      success: true,
      message: 'Inschrijven page updated successfully',
      data: result,
    })
  } catch (error) {
    console.error('Error updating inschrijven page:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update inschrijven page', 
        details: error.message 
      },
      { status: 500 }
    )
  }
}