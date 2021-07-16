"""connections table

Revision ID: 4e7f49d222a1
Revises: 
Create Date: 2021-07-15 22:41:17.534343

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4e7f49d222a1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('account',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_account_email'), 'account', ['email'], unique=True)
    op.create_index(op.f('ix_account_username'), 'account', ['username'], unique=True)
    op.create_table('connection',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('dateVisited', sa.Date(), nullable=True),
    sa.Column('ipAddress', sa.String(length=100), nullable=True),
    sa.Column('country', sa.String(length=100), nullable=True),
    sa.Column('state', sa.String(length=100), nullable=True),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('lat', sa.Numeric(), nullable=True),
    sa.Column('lon', sa.Numeric(), nullable=True),
    sa.Column('isp', sa.String(length=200), nullable=True),
    sa.Column('mobile', sa.Boolean(), nullable=True),
    sa.Column('proxy', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_connection_city'), 'connection', ['city'], unique=False)
    op.create_index(op.f('ix_connection_country'), 'connection', ['country'], unique=False)
    op.create_index(op.f('ix_connection_dateVisited'), 'connection', ['dateVisited'], unique=False)
    op.create_index(op.f('ix_connection_ipAddress'), 'connection', ['ipAddress'], unique=False)
    op.create_index(op.f('ix_connection_isp'), 'connection', ['isp'], unique=False)
    op.create_index(op.f('ix_connection_lat'), 'connection', ['lat'], unique=False)
    op.create_index(op.f('ix_connection_lon'), 'connection', ['lon'], unique=False)
    op.create_index(op.f('ix_connection_mobile'), 'connection', ['mobile'], unique=False)
    op.create_index(op.f('ix_connection_proxy'), 'connection', ['proxy'], unique=False)
    op.create_index(op.f('ix_connection_state'), 'connection', ['state'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_connection_state'), table_name='connection')
    op.drop_index(op.f('ix_connection_proxy'), table_name='connection')
    op.drop_index(op.f('ix_connection_mobile'), table_name='connection')
    op.drop_index(op.f('ix_connection_lon'), table_name='connection')
    op.drop_index(op.f('ix_connection_lat'), table_name='connection')
    op.drop_index(op.f('ix_connection_isp'), table_name='connection')
    op.drop_index(op.f('ix_connection_ipAddress'), table_name='connection')
    op.drop_index(op.f('ix_connection_dateVisited'), table_name='connection')
    op.drop_index(op.f('ix_connection_country'), table_name='connection')
    op.drop_index(op.f('ix_connection_city'), table_name='connection')
    op.drop_table('connection')
    op.drop_index(op.f('ix_account_username'), table_name='account')
    op.drop_index(op.f('ix_account_email'), table_name='account')
    op.drop_table('account')
    # ### end Alembic commands ###
